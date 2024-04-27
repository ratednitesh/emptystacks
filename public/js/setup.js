import { getUid } from "./firebase-config";
import { publish } from "./event-bus";
import { createNewUser, emailPasswordSignIn, firebaseSignOut, googleSignIn, isUserLoggedIn, tryPasswordResetEmail } from "./firebase-config";

let userLoggedIn;
export function pushPopupMessage(data) {
    let el = document.createElement('DIV');
    el.classList.add('popup');
    el.innerHTML = data[1];
    let color;
    switch (data[0]) {
        case 'SUCCESS': color = "#38c464"; break;
        case 'FAILURE': color = "#c5503b"; break;
        case 'WARNING': color = "#eab735"; break;
        case 'INFO': color = "#33a6e8";
    }
    el.style.backgroundColor = color;
    document.body.appendChild(el);
    setTimeout(() => {
        el.remove();
    }, 5000);
  }

function initAuthentication() {
    userLoggedIn = isUserLoggedIn();
    console.log("user logged in status:" + userLoggedIn);
    updateUserPrivateData(userLoggedIn);
}
function signOut() {
    firebaseSignOut().then(() => {
        userLoggedIn = isUserLoggedIn();
        if (!userLoggedIn) {
            pushPopupMessage(["SUCCESS", "Logout successful!"]);
            updateUserPrivateData(userLoggedIn);
            publish('updateQuickSelectOptions', userLoggedIn);
        } else {
            pushPopupMessage(["FAILURE", "Sign out Failed!"])
        }
    });
}

function signIn(provider, userToken) {
    if (provider == 'Google') {
        googleSignIn().then(() => {
            userLoggedIn = isUserLoggedIn();
            if (userLoggedIn) {
                console.log("User Logged In");
                loginSuccess();
                updateUserPrivateData(userLoggedIn);
                publish('updateQuickSelectOptions', userLoggedIn);
                pushPopupMessage(["SUCCESS", "Login successful!"])
            }
        }).catch(() => {
            pushPopupMessage(["FAILURE", "Sign In Failed!"])
        });
    } else if (provider == 'emailAddress') {
        emailPasswordSignIn(userToken).then(() => {
            userLoggedIn = isUserLoggedIn();
            if (userLoggedIn) {
                console.log("User Logged In");
                loginSuccess();
                updateUserPrivateData(userLoggedIn);
                publish('updateQuickSelectOptions', userLoggedIn);
                pushPopupMessage(["SUCCESS", "Login successful!"])
            }
        }).catch(() => {
            pushPopupMessage(["FAILURE", "Sign In Failed!"])
        });
    }
}

function signUp(userToken) {
    createNewUser(userToken).then(() => {
        userLoggedIn = isUserLoggedIn();
        if (userLoggedIn) {
            console.log("User Logged In");
            loginSuccess();
            updateUserPrivateData(userLoggedIn);
            publish('updateQuickSelectOptions', userLoggedIn);
            pushPopupMessage(["SUCCESS", "Registration successful!"]);
            setTimeout(() => { pushPopupMessage(["SUCCESS", `A verification link is sent to ${userToken.email}`]) }, 5000);
        }
    }).catch(() => {
        pushPopupMessage(["FAILURE", "Registration Failed!"])
    });
}

function forgotPassword(email) {
    tryPasswordResetEmail(email).then(
        () => { pushPopupMessage(["SUCCESS", "A password reset email has been sent!"]) }
    ).catch(() => {
        pushPopupMessage(["FAILURE", "Something went wrong, please try again later!"])
    });
}

export function loginStatus() {
    return userLoggedIn;
}
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

export function initStaticContent() {
    initHeaders();
    initGlobalEvents();
    initUserModal();
    initAuthentication();
}
function initHeaders() {
    headerListeners();
    let darkMode = localStorage.getItem('dark-mode');
    if (darkMode === 'enabled') {
        enableDarkMode();
    }
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
        document.body.classList.toggle('active');

    };
    //trigger events
    document.getElementById('signOutButton').addEventListener('click', () => { removeMenuOptions(); signOut(); });
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
    // userButton.classList.toggle('es-rotate-270');
    menusModal.classList.toggle('is-visible');
}

function removeMenuOptions() {
    menusModal.classList.remove('is-visible');
    profile.classList.remove('active');
}

// Global Event click outside of menus dropdown
function closeMenuOptions(event) {
    if (event.target === menusModal) {
        removeMenuOptions();
    }
}

export function updateUserPrivateData(userLoggedIn) {
    if (userLoggedIn) {
        let uid = getUid();
        getUserPrivateData(uid) // TODO: Use it from args
            .then((userData) => {
                document.getElementById('user-photo-header').src = userData.userProfileSrc;
                document.getElementById('user-menu-photo').src = userData.userProfileSrc;
                document.getElementById('user-menu-name').innerHTML = userData.username;
                document.getElementById('user-menu-mail').innerHTML = userData.mailId;
                profileMenuOnlyPublic.forEach((node) => { node.style.display = "none" });
                profileMenuPrivate.forEach((node) => { node.style.display = "block" });
                document.getElementById('user-photo-header').style.display = "block";
                document.getElementById('guest-photo-header').style.display = "none";
                document.getElementById('profile-link').href = "/profile/" + uid;
                sideBar.querySelector('#user-photo-sb').src = userData.userProfileSrc;
                sideBar.querySelector('#user-name-sb').innerHTML = userData.username;
                sideBar.querySelector('#user-role-sb').innerHTML = userData.role;
            }).catch(() => { pushPopupMessage(["FAILURE", "Something went wrong, unable to load user profile."]); })
    } else {
        profileMenuPrivate.forEach((node) => { node.style.display = "none" });
        profileMenuOnlyPublic.forEach((node) => { node.style.display = "block" });
        document.getElementById('user-photo-header').style.display = "none";
        document.getElementById('guest-photo-header').style.display = "block";
        document.getElementById('guest-menu-photo').src = "/images/profile/guest-user.svg";
        sideBar.querySelector('#user-photo-sb').src = "/images/profile/guest-user.svg";
        sideBar.querySelector('#user-name-sb').innerHTML = 'Hello Guest!';
    }
}




// auth modal
const form_modal = document.querySelector(".cd-user-modal");
const form_login = document.querySelector("#cd-login");
const form_login_email = form_login.querySelector('#signin-email');
const form_login_pass = form_login.querySelector('#signin-password');
const form_signup = document.querySelector("#cd-signup");
const form_signup_email = form_signup.querySelector('#signup-email');
const form_signup_pass = form_signup.querySelector('#signup-password');
const form_signup_username = form_signup.querySelector('#signup-username');
const form_forgot_password = document.querySelector("#cd-reset-password");
const form_modal_tab = document.querySelector(".cd-switcher");
const tab_login = form_modal_tab.children[0].children[0];
const tab_signup = form_modal_tab.children[1].children[0];
const forgot_password_link = form_login.querySelector(".cd-form-bottom-message a");
const back_to_login_link = form_forgot_password.querySelector(".cd-form-bottom-message a");
const main_nav = document.querySelector("#sign-up");
const startJourney = document.querySelector('#start-journey');

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

    // switch from a tab to another
    form_modal_tab.addEventListener("click", function (event) {
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
                pushPopupMessage(['SUCCESS', 'Processing request...']);
                let userToken = createUserToken('', email, password);
                signIn('emailAddress', userToken);
            }
        }
        form_login.querySelector('input[type="email"]').classList.toggle("has-error");
        // form_login.querySelector(".cd-error-message span").classList.toggle("is-visible");
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
                        pushPopupMessage(['SUCCESS', 'Processing request...']);
                        let userToken = createUserToken(username, email, password);
                        signUp(userToken);
                    }
                    else
                        pushPopupMessage(['FAILURE', 'Please agree to Terms & Conditions!']);
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
            pushPopupMessage(['SUCCESS', 'Processing request...']);
            forgotPassword(email);
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

    document.querySelectorAll('.google-btn').forEach((event) => event.addEventListener("click", () => { signIn('Google') }));
    document.querySelectorAll('.facebook-btn').forEach((event) => event.addEventListener("click", () => { pushPopupMessage(['FAILURE', 'Sorry, Facebook login not supported at the moment!']) }));
    document.querySelectorAll('.apple-btn').forEach((event) => event.addEventListener("click", () => { pushPopupMessage(['FAILURE', 'Sorry, Apple login not supported at the moment!']) }));
    document.querySelectorAll('.github-btn').forEach((event) => event.addEventListener("click", () => { pushPopupMessage(['FAILURE', 'Sorry, GitHub login not supported at the moment!']) }));
}

function login_selected() {
    form_modal.classList.add("is-visible");
    form_login.classList.add("is-selected");
    form_signup.classList.remove("is-selected");
    form_forgot_password.classList.remove("is-selected");
    tab_login.classList.add("selected");
    tab_signup.classList.remove("selected");
}

export function signup_selected() {
    form_modal.classList.add("is-visible");
    form_login.classList.remove("is-selected");
    form_signup.classList.add("is-selected");
    form_forgot_password.classList.remove("is-selected");
    tab_login.classList.remove("selected");
    tab_signup.classList.add("selected");
}

function forgot_password_selected() {
    form_login.classList.remove("is-selected");
    form_signup.classList.remove("is-selected");
    form_forgot_password.classList.add("is-selected");
}

function closeModal(event) {
    if (event.target === form_modal || event.target.classList.contains("cd-close-form")) {
        form_modal.classList.remove("is-visible");
    }
}

function escModal(event) {
    if (event.which === 27 && form_modal.classList.contains("is-visible")) {
        form_modal.classList.remove("is-visible");
    }
}

export function loginSuccess() {
    form_modal.classList.remove("is-visible");
}
function validateUsername(username) {
    if (username.trim() === '') {
        pushPopupMessage(['FAILURE', 'Username is required.']);
        return false;
    }
    return true;
}
function validateEmail(email) {
    // Basic email validation using a regular expression
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === '') {
        pushPopupMessage(['FAILURE', 'email id is required.']);
        return false;
    } else if (!emailRegex.test(email)) {
        pushPopupMessage(['FAILURE', 'Email ID is not valid']);
        return false;
    }

    return true;
}
function validatePassword(password) {
    var allowedSpecialCharacters = '@$!%*?&';
    // Check for at least one uppercase letter, one lowercase letter, one digit, and one special character
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    if (password.trim() === '') {
        pushPopupMessage(['FAILURE', 'Password is required.']);
        return false;
    } else if (password.length < 8) {
        pushPopupMessage(['FAILURE', 'Password must be at least 8 characters long.']);
        return false;
    } else if (!passwordRegex.test(password)) {
        var invalidSpecialChars = Array.from(password).filter(char => !allowedSpecialCharacters.includes(char)).join('').replace(/[a-zA-Z0-9]/g, '');
        if (invalidSpecialChars.length != 0) {
            pushPopupMessage(['FAILURE', `${invalidSpecialChars} - not part of allowed special characters: ${allowedSpecialCharacters}`]);
            return false;
        }
        pushPopupMessage(['FAILURE', 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.']);
        return false;
    } else if (password.length > 25) {
        pushPopupMessage(['FAILURE', 'Password cannot be more than 25 characters.']);
        return false;
    }
    return true;
}
function createUserToken(username, email, password) {
    // Create a JSON object to represent the user token
    var userToken = {
        username: username,
        password: password,
        email: email
        // Add other relevant information as needed
    };
    return userToken;
}

function initGlobalEvents() {
    document.addEventListener("click", function (event) { closeModal(event); closeMenuOptions(event); });
    document.addEventListener("keyup", function (event) { escModal(event); });
}
let cachedPrivateDate;
export async function getUserPrivateData(uid) {
    return new Promise((resolve, reject) => {
        // If data is already cached, resolve with the cached data
        if (cachedPrivateDate) {
            console.log('Read private from cache');
            resolve(cachedPrivateDate);
        } else {
            import('/public/test/mock-api.js').then(mockApi => {
                // Simulate an API call
                mockApi.mockgetUserPrivateDataAPICall(uid)
                    .then(response => {
                        // Store the API response in the cachedData object
                        console.log('Resolved');
                        cachedPrivateDate = response;
                        resolve(response); // Resolve with the API response
                    })
                    .catch(error => {
                        reject(error); // Reject with the error from the API call
                    });
            });
        }
    });
}