import { notification } from "./helper";
import { applyForTutor, getAllCourses, getUserId, getCurrentUserObject, signUp, signOut, signIn, forgotPassword, changePassword } from "./db-services";
import { modifyDisabledClass, showCoursesUI } from "./ui-services";

// Header Button
const toggleBtn = document.querySelector('#toggle-btn');
const toggleModeIcon = document.querySelector('#mode-icon');
const toggleModeText = document.querySelector('#mode-text');
const menuBtn = document.querySelector('#menu-btn');
const userBtn = document.querySelector('#user-btn');
const sideBar = document.querySelector('#sideBar');
const logoImg = document.getElementsByClassName("logo-img");
const menusModal = document.querySelector('.header .flex .menus-modal');
const profile = document.querySelector('.header .flex .menus-modal .menus');
const profileMenuPrivate = document.querySelectorAll('.header .flex .menus .private');
const profileMenuOnlyPublic = document.querySelectorAll('.header .flex .menus .only-public');
const signOutBtn = document.getElementById('signOutButton');

// auth modal button 
const auth_modal = document.querySelector(".cd-user-modal");

const form_login = document.querySelector("#cd-login");
const form_login_email = form_login.querySelector('#signin-email');
const form_login_pass = form_login.querySelector('#signin-password');
const form_signup = document.querySelector("#cd-signup");
const form_signup_email = form_signup.querySelector('#signup-email');
const form_signup_pass = form_signup.querySelector('#signup-password');
const form_signup_username = form_signup.querySelector('#signup-username');
const form_forgot_password = document.querySelector("#cd-reset-password");
const auth_modal_tab = document.querySelector(".cd-switcher");
const tab_login = auth_modal_tab.children[0].children[0];
const tab_signup = auth_modal_tab.children[1].children[0];
const forgot_password_link = form_login.querySelector(".cd-form-bottom-message a");
const back_to_login_link = form_forgot_password.querySelector(".cd-form-bottom-message a");
const main_nav = document.querySelector("#sign-up");
const acc_sett = document.querySelector("#account-settings");
const reg_tutor = document.querySelector("#register-tutor");
const accSettModal = document.querySelector(".acc-sett-modal");
const regTutorModal = document.querySelector(".reg-tutor-modal");
const startJourney = document.querySelector('#start-journey');

let searchData = {};
/* One time init Logic */
export function initStaticContent() {
    // Initialize
    initHeaders();
    initGlobalEventsListeners();
    initUserModal();
    initSearchBar();
    // Load logged in user data
    loadUserPrivateData();
}
// Header Initializers and Listeners: 
function initHeaders() {
    headerListeners();
    let darkMode = localStorage.getItem('dark-mode');
    if (darkMode === 'enabled') {
        enableDarkMode();
    }
}
function initSearchBar() {
    document.getElementById('search_box').addEventListener('input', async function (event) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        await initSearchCourses();
        const query = event.target.value;
        handleInputChange(query);
    });

}
function initSearchCourses() {
    getAllCourses().then(
        (coursesData) => {
            showCoursesUI(coursesData, '.search .flex-container', 'search-');
            for (const [href, course] of Object.entries(coursesData)) {
                searchData['search-' + href] = course.title;
            };
        }
    ).catch((e) => {
        notification(501, 'popular courses');
    });

}
function handleInputChange(query) {
    if (query) {
        modifyDisabledClass(document.querySelector("#search"), 0);
        for (let [key, value] of Object.entries(searchData)) {
            if (value.toLowerCase().includes(query.toLowerCase())) {
                modifyDisabledClass(document.getElementById(key), 0);
            } else {
                modifyDisabledClass(document.getElementById(key), 1);
            }
        }
    }
    else
        modifyDisabledClass(document.querySelector("#search"), 1);
    // You can add more logic here to handle the input, such as filtering courses
}
function headerListeners() {
    // static actions 
    userBtn.onclick = () => {
        toggleMenuOptions();
    };
    toggleBtn.onclick = (e) => {
        let darkMode = localStorage.getItem('dark-mode');
        if (darkMode === 'disabled')
            enableDarkMode();
        else
            disableDarkMode();
    };
    menuBtn.onclick = () => {
        sideBar.classList.toggle('active');
        document.body.classList.toggle('active'); // TODO: toggles active tag everywhere in the body too 

    };
    //trigger events
    signOutBtn.onclick = () => {
        removeMenuOptions();
        triggerSignOut();
    };

    let privateMenuOptions = document.querySelectorAll(".menu .private");
    privateMenuOptions.forEach(function (link) {
        link.addEventListener("click", function (e) {
            removeMenuOptions();
        })
    });
}
function enableDarkMode() {
    toggleBtn.classList.replace('es-sun', 'es-moon');
    toggleModeIcon.classList.replace('es-moon', 'es-sun');
    toggleModeText.innerHTML = "Enable Light Mode";
    logoImg[0].src = "/images/Logo/logo_dark.svg"
    document.body.classList.add('dark');
    localStorage.setItem('dark-mode', 'enabled');
}
function disableDarkMode() {
    toggleBtn.classList.replace('es-moon', 'es-sun');
    toggleModeIcon.classList.replace('es-sun', 'es-moon');
    toggleModeText.innerHTML = "Enable Dark Mode";
    logoImg[0].src = "/images/Logo/logo_light.svg"
    document.body.classList.remove('dark');
    localStorage.setItem('dark-mode', 'disabled');
}
function toggleMenuOptions() {
    profile.classList.toggle('active');
    menusModal.classList.toggle('is-visible');
}
export function removeMenuOptions() {
    menusModal.classList.remove('is-visible');
    profile.classList.remove('active');
}

// Global Initializers and Listeners:  Event click outside of menus dropdown
function initGlobalEventsListeners() {
    document.addEventListener("click", function (event) { closeModal(event); closeMenuOptions(event); });
    document.addEventListener("keyup", function (event) { escModal(event); });
}
function closeMenuOptions(event) {
    if (event.target === menusModal) {
        removeMenuOptions();
    }
}
function closeModal(event) {
    const forms_modal = document.querySelectorAll(".cd-forms-modal");
    forms_modal.forEach(fm => {
        if (event.target === fm || event.target.classList.contains("cd-close-form")) {
            fm.classList.remove("is-visible");
        }
    });
}
function escModal(event) {
    const forms_modal = document.querySelectorAll(".cd-forms-modal");
    forms_modal.forEach(fm => {
        if (event.which === 27 && fm.classList.contains("is-visible")) {
            fm.classList.remove("is-visible");
        }
    });
}

// User Modal Initializers and Listeners: 
function initUserModal() {
    var rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById('signin-email').value = rememberedEmail;
        document.getElementById('remember-me').checked = true;
    }
    modalListeners();
}
function modalListeners() {
    // start journey
    startJourney.addEventListener("click", function () {
        removeMenuOptions();
        signup_selected();
    });
    // open modal
    main_nav.addEventListener("click", function (event) {
        removeMenuOptions();
        event.target.classList.contains("cd-signup") ? signup_selected() : login_selected();
    });
    acc_sett.addEventListener("click", function (event) {
        removeMenuOptions();
        accSettModal.classList.add("is-visible");
    });
    reg_tutor.addEventListener("click", function (event) {
        removeMenuOptions();
        regTutorModal.classList.add("is-visible");
    });
    // switch from a tab to another
    auth_modal_tab.addEventListener("click", function (event) {
        event.preventDefault();
        event.target === tab_login ? login_selected() : signup_selected();
    });

    // hide or show password
    document.querySelectorAll(".hide-password").forEach((event) => event.addEventListener("click", function () {
        var passwordField = this.previousElementSibling;
        passwordField.type = passwordField.type === "password" ? "text" : "password";
        this.textContent = passwordField.type === "password" ? "Show" : "Hide";
        // focus and move cursor to the end of input field
        passwordField.putCursorAtEnd();
    }));

    // show forgot-password form
    forgot_password_link.addEventListener("click", function (event) {
        event.preventDefault();
        forgot_password_selected();
    });

    // back to login from the forgot-password form
    back_to_login_link.addEventListener("click", function (event) {
        event.preventDefault();
        login_selected();
    });

    form_login.querySelector('input[type="submit"]').addEventListener("click", function (event) {
        event.preventDefault();
        // let username = form_login.querySelector('signup-username').value;
        let email = form_login_email.value;
        let password = form_login_pass.value;
        let rememberMe = form_login.querySelector('#remember-me').checked;
        if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
        } else {
            // If not checked, remove the username from localStorage
            localStorage.removeItem('rememberedEmail');
        }
        if (!validateEmail(email))
            form_login_email.classList.add("has-error");
        else {
            form_login_email.classList.add("has-no-error");
            if (!validatePassword(password))
                form_login_pass.classList.add("has-error");
            else {
                form_login_pass.classList.add("has-no-error");
                notification(203);
                triggerSignIn('Email&Password', { email: email, password: password });
            }
        }
        form_login.querySelector('input[type="email"]').classList.toggle("has-error");
    });

    form_signup.querySelector('input[type="submit"]').addEventListener("click", function (event) {
        event.preventDefault();
        let username = form_signup_username.value;
        let email = form_signup_email.value;
        let password = form_signup_pass.value;

        if (!validateUsername(username))
            form_signup_username.classList.add("has-error");
        else {
            form_signup_username.classList.add("has-no-error");
            if (!validateEmail(email))
                form_signup_email.classList.add("has-error");
            else {
                form_signup_email.classList.add("has-no-error");
                if (!validatePassword(password))
                    form_signup_pass.classList.add("has-error");
                else {
                    form_signup_pass.classList.add("has-no-error");
                    if (form_signup.querySelector('#accept-terms').checked) {
                        notification(203);
                        signUp(username, email, password).then(() => {
                            loginSuccess();
                            notification(200);
                            setTimeout(() => { notification(205, email); }, 1000);
                            setTimeout(() => { location.reload(); }, 5000);
                        }).catch(() => {
                            notification(505);
                        });
                    }
                    else
                        notification(301);
                }
            }
        }
    });

    form_forgot_password.querySelector('input[type="submit"]').addEventListener("click", function (event) {
        event.preventDefault();
        let email = form_forgot_password.querySelector('#reset-email').value;
        if (!validateEmail(email))
            form_forgot_password.querySelector('#reset-email').classList.add("has-error");
        else {
            form_forgot_password.querySelector('#reset-email').classList.add("has-no-error");
            notification(203);
            forgotPassword(email).then(
                () => { notification(206) }
            ).catch(() => {
                notification(500);
            });
        }
    });

    // IE9 placeholder fallback
    if (!("placeholder" in document.createElement("input"))) {
        var placeholders = document.querySelectorAll("[placeholder]");

        Array.from(placeholders).forEach(function (placeholder) {
            placeholder.addEventListener("focus", function () {
                if (this.value === this.getAttribute("placeholder")) {
                    this.value = "";
                }
            });

            placeholder.addEventListener("blur", function () {
                if (this.value === "" || this.value === this.getAttribute("placeholder")) {
                    this.value = this.getAttribute("placeholder");
                }
            });

            placeholder.addEventListener("blur", function () {
                if (this.value === "" || this.value === this.getAttribute("placeholder")) {
                    this.value = this.getAttribute("placeholder");
                }
            });
        });

        var formWithPlaceholders = document.querySelector("[placeholder]").closest("form");
        if (formWithPlaceholders) {
            formWithPlaceholders.addEventListener("submit", function () {
                placeholders.forEach(function (placeholder) {
                    if (placeholder.value === placeholder.getAttribute("placeholder")) {
                        placeholder.value = "";
                    }
                });
            });
        }
    }
    // credits https://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/

    HTMLElement.prototype.putCursorAtEnd = function () {
        if (this.setSelectionRange) {
            var len = this.value.length * 2;
            this.setSelectionRange(len, len);
        } else {
            this.value = this.value;
        }
    };

    document.querySelectorAll('.google-btn').forEach((event) => event.addEventListener("click", () => { triggerSignIn('Google') }));
    document.querySelectorAll('.facebook-btn').forEach((event) => event.addEventListener("click", () => { notification(506) }));
    document.querySelectorAll('.apple-btn').forEach((event) => event.addEventListener("click", () => { notification(506) }));
    document.querySelectorAll('.github-btn').forEach((event) => event.addEventListener("click", () => { notification(506) }));

    regTutorModal.querySelector('input[type="submit"]').addEventListener("click", function (event) {
        // Prevent the default form submission
        event.preventDefault();
        let uid = getUserId();
        if (!uid) {
            notification(315);
            return;
        }
        // Validate form fields
        // var name = document.getElementById("reg-tutor-name").value.trim();
        // var email = document.getElementById("reg-tutor-email").value.trim();
        var msg = document.getElementById("reg-tutor-msg").value.trim();
        // var pdfFile = document.getElementById("reg-tutor-pdfFile").value.trim();
        if (msg === '') {
            notification(310);
            return;
        }
        if (msg.length < 30) {
            notification(316, "30");
            return;
        }
        if (msg.length > 500) {
            notification(313, "500");
            return;
        }
        let formData = {
            message: msg,
            status: "new"
        };
        applyForTutor(formData).then(
            () => {
                notification(209);
                regTutorModal.classList.remove('is-visible');
            }
        ).catch(
            () => { notification(317); }
        )
    });

    accSettModal.querySelector('input[type="submit"]').addEventListener("click", function (event) {
        event.preventDefault();

        var old = document.getElementById("acc-old-pass").value;
        var newp = document.getElementById("acc-new-pass").value;
        var conf = document.getElementById("acc-conf-pass").value;
        if (old === '' || newp === '' || conf === '') {
            notification(310);
            return;
        }
        else if (newp != conf)
            notification(311);
        else if (validatePassword(newp)) {
            changePassword(old, newp).then(() => {
                notification(210);
                accSettModal.classList.remove('is-visible');
                setTimeout(() => { triggerSignOut() }, 2500);
            }).catch((e) => {
                notification(507, e);
            });
        }
    });
}
function login_selected() {
    auth_modal.classList.add("is-visible");
    modifyDisabledClass(form_login, 0);
    modifyDisabledClass(form_signup, 1);
    modifyDisabledClass(form_forgot_password, 1);
    tab_login.classList.add("selected");
    tab_signup.classList.remove("selected");
}
export function signup_selected() {
    auth_modal.classList.add("is-visible");
    modifyDisabledClass(form_login, 1);
    modifyDisabledClass(form_signup, 0);
    modifyDisabledClass(form_forgot_password, 1);
    tab_login.classList.remove("selected");
    tab_signup.classList.add("selected");
}
function forgot_password_selected() {
    modifyDisabledClass(form_login, 1);
    modifyDisabledClass(form_signup, 1);
    modifyDisabledClass(form_forgot_password, 0);
}
function loginSuccess() {
    auth_modal.classList.remove("is-visible");
}

// Authentication Functions: 
function triggerSignOut() {
    signOut().then(() => {
        if (!getUserId()) {
            location.reload();
            notification(204);
        } else {
            notification(504);
        }
    });
}
function triggerSignIn(provider, userToken) {
    signIn(provider, userToken).then(() => {
        if (getUserId()) {
            loginSuccess();
            notification(201);
            location.reload();
        }
    }).catch(() => {
        notification(503);
    });
}



// Update user info on auth status change on header and main sidebar.
function loadUserPrivateData() {
    let user = getCurrentUserObject();
    if (user) {
        let uid = user.uid;
        document.getElementById('user-photo-header').src = user.photoURL;
        document.getElementById('user-menu-photo').src = user.photoURL;
        document.getElementById('user-menu-name').innerHTML = user.displayName;
        document.getElementById('user-menu-mail').innerHTML = user.email;
        profileMenuOnlyPublic.forEach((node) => { modifyDisabledClass(node, 1) });
        profileMenuPrivate.forEach((node) => { modifyDisabledClass(node, 0) });
        modifyDisabledClass(document.getElementById('user-photo-header'), 0);
        modifyDisabledClass(document.getElementById('guest-photo-header'), 1);
        document.getElementById('profile-link').href = "/profile/" + uid;
        document.getElementById('header-profile-link').href = "/profile/" + uid;
        document.getElementById('sb-profile-link').href = "/profile/" + uid;
        sideBar.querySelector('#user-photo-sb').src = user.photoURL;
        sideBar.querySelector('#user-name-sb').innerHTML = user.displayName;
        sideBar.querySelector('#user-role-sb').innerHTML = user.email;
        document.getElementById('acc-sett-name').placeholder = user.displayName;
        document.getElementById('acc-sett-mail').placeholder = user.email;

    } else {
        profileMenuPrivate.forEach((node) => { modifyDisabledClass(node, 1) });
        profileMenuOnlyPublic.forEach((node) => { modifyDisabledClass(node, 0) });
        modifyDisabledClass(document.getElementById('user-photo-header'), 1);
        modifyDisabledClass(document.getElementById('guest-photo-header'), 0)
        document.getElementById('guest-menu-photo').src = "/images/profile/guest-user.svg";
        sideBar.querySelector('#user-photo-sb').src = "/images/profile/guest-user.svg";
        sideBar.querySelector('#user-name-sb').innerHTML = 'Hello Guest!';
    }
}

/* Local helper function for validations / create user tokens etc. */
function validateUsername(username) {
    if (username.trim() === '') {
        notification(302);
        return false;
    }
    return true;
}
function validateEmail(email) {
    // Basic email validation using a regular expression
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === '') {
        notification(303);
        return false;
    } else if (!emailRegex.test(email)) {
        notification(304);
        return false;
    }

    return true;
}
function validatePassword(password) {
    var allowedSpecialCharacters = '@$!%*?&';
    // Check for at least one uppercase letter, one lowercase letter, one digit, and one special character
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    if (password.trim() === '') {
        notification(305);
        return false;
    } else if (password.length < 8) {
        notification(306);
        return false;
    } else if (!passwordRegex.test(password)) {
        var invalidSpecialChars = Array.from(password).filter(char => !allowedSpecialCharacters.includes(char)).join('').replace(/[a-zA-Z0-9]/g, '');
        if (invalidSpecialChars.length != 0) {
            notification(308, `${invalidSpecialChars} - not part of allowed special characters: ${allowedSpecialCharacters}`);
            return false;
        }
        notification(309);
        return false;
    } else if (password.length > 25) {
        notification(307);
        return false;
    }
    return true;
}

