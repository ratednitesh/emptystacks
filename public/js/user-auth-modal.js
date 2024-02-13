import { publish } from "./event-bus";
import { forgotPassword, signIn, signUp } from "./manage-auth";

var form_modal;
var form_login;
var form_signup;
var form_forgot_password;
var form_modal_tab;
var tab_login;
var tab_signup;
var forgot_password_link;
var back_to_login_link;
var main_nav;
var startJourney;

export function initUserModal() {
    createUserAuthForm(function(){
        form_modal = document.querySelector(".cd-user-modal");
        form_login = document.querySelector("#cd-login");
        form_signup = document.querySelector("#cd-signup");
        form_forgot_password = document.querySelector("#cd-reset-password");
        form_modal_tab = document.querySelector(".cd-switcher");
        tab_login = form_modal_tab.children[0].children[0];
        tab_signup = form_modal_tab.children[1].children[0];
        forgot_password_link = form_login.querySelector(".cd-form-bottom-message a");
        back_to_login_link = form_forgot_password.querySelector(".cd-form-bottom-message a");
        main_nav = document.querySelector("#sign-up");
        startJourney = document.querySelector('#start-journey');
        var rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
            document.getElementById('signin-email').value = rememberedEmail;
            document.getElementById('remember-me').checked = true;
        }
        modalListeners();
    });
    
}

function modalListeners() {
    // start journey
    startJourney.addEventListener("click", function () {
        publish('removeMenuOptions');
        loadSignUpForm();
    });
    // open modal
    main_nav.addEventListener("click", function (event) {
        publish('removeMenuOptions');
        if (event.target === main_nav) {
            // on mobile open the submenu
            main_nav.children[0].classList.toggle("is-visible");
        } else {
            // on mobile close submenu
            main_nav.children[0].classList.remove("is-visible");
            // show modal layer
            form_modal.classList.add("is-visible");
            // show the selected form
            event.target.classList.contains("cd-signup") ? signup_selected() : login_selected();
        }
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

    // REMOVE THIS - it's just to show error messages
    form_login.querySelector('input[type="submit"]').addEventListener("click", function (event) {
        event.preventDefault();
        // let username = form_login.querySelector('signup-username').value;
        let email = form_login.querySelector('#signin-email').value;
        let password = form_login.querySelector('#signin-password').value;
        let rememberMe = form_login.querySelector('#remember-me').checked;
        if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
        } else {
            // If not checked, remove the username from localStorage
            localStorage.removeItem('rememberedEmail');
        }
        if (!validateEmail(email))
            form_login.querySelector('#signin-email').classList.add("has-error");
        else {
            form_login.querySelector('#signin-email').classList.add("has-no-error");

            if (!validatePassword(password))
                form_login.querySelector('#signin-password').classList.add("has-error");
            else {
                form_login.querySelector('#signin-password').classList.add("has-no-error");
                publish('pushPopupMessage', ['SUCCESS', 'Processing request...']);
                let userToken = createUserToken('', email, password);
                signIn('emailAddress', userToken);
            }
        }
        form_login.querySelector('input[type="email"]').classList.toggle("has-error");
        // form_login.querySelector(".cd-error-message span").classList.toggle("is-visible");
    });

    form_signup.querySelector('input[type="submit"]').addEventListener("click", function (event) {
        event.preventDefault();
        let username = form_signup.querySelector('#signup-username').value;
        let email = form_signup.querySelector('#signup-email').value;
        let password = form_signup.querySelector('#signup-password').value;

        if (!validateUsername(username))
            form_signup.querySelector('#signup-username').classList.add("has-error");
        else {
            form_signup.querySelector('#signup-username').classList.add("has-no-error");

            if (!validateEmail(email))
                form_signup.querySelector('#signup-email').classList.add("has-error");
            else {
                form_signup.querySelector('#signup-email').classList.add("has-no-error");

                if (!validatePassword(password))
                    form_signup.querySelector('#signup-password').classList.add("has-error");
                else {
                    form_signup.querySelector('#signup-password').classList.add("has-no-error");
                    if (form_signup.querySelector('#accept-terms').checked) {
                        publish('pushPopupMessage', ['SUCCESS', 'Processing request...']);
                        let userToken = createUserToken(username, email, password);
                        signUp(userToken);
                    }
                    else
                        publish('pushPopupMessage', ['FAILURE', 'Please agree to Terms & Conditions!']);
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
            publish('pushPopupMessage', ['SUCCESS', 'Processing request...']);
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
    document.querySelectorAll('.facebook-btn').forEach((event) => event.addEventListener("click", () => { publish('pushPopupMessage', ['FAILURE', 'Sorry, Facebook login not supported at the moment!']) }));
    document.querySelectorAll('.apple-btn').forEach((event) => event.addEventListener("click", () => { publish('pushPopupMessage', ['FAILURE', 'Sorry, Apple login not supported at the moment!']) }));
    document.querySelectorAll('.github-btn').forEach((event) => event.addEventListener("click", () => { publish('pushPopupMessage', ['FAILURE', 'Sorry, GitHub login not supported at the moment!']) }));
}

function login_selected() {
    form_login.classList.add("is-selected");
    form_signup.classList.remove("is-selected");
    form_forgot_password.classList.remove("is-selected");
    tab_login.classList.add("selected");
    tab_signup.classList.remove("selected");
}

function signup_selected() {
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

export function closeModal(event) {
    if (event.target === form_modal || event.target.classList.contains("cd-close-form")) {
        form_modal.classList.remove("is-visible");
    }
}

export function escModal(event) {
    if (event.which === 27 && form_modal.classList.contains("is-visible")) {
        form_modal.classList.remove("is-visible");
    }
}

export function loginSuccess() {
    form_modal.classList.remove("is-visible");
}
function validateUsername(username) {
    if (username.trim() === '') {
        publish('pushPopupMessage', ['FAILURE', 'Username is required.']);
        return false;
    }
    return true;
}
function validateEmail(email) {
    // Basic email validation using a regular expression
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === '') {
        publish('pushPopupMessage', ['FAILURE', 'email id is required.']);
        return false;
    } else if (!emailRegex.test(email)) {
        publish('pushPopupMessage', ['FAILURE', 'Email ID is not valid']);
        return false;
    }

    return true;
}
function validatePassword(password) {
    var allowedSpecialCharacters = '@$!%*?&';
    // Check for at least one uppercase letter, one lowercase letter, one digit, and one special character
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    if (password.trim() === '') {
        publish('pushPopupMessage', ['FAILURE', 'Password is required.']);
        return false;
    } else if (password.length < 8) {
        publish('pushPopupMessage', ['FAILURE', 'Password must be at least 8 characters long.']);
        return false;
    } else if (!passwordRegex.test(password)) {
        var invalidSpecialChars = Array.from(password).filter(char => !allowedSpecialCharacters.includes(char)).join('').replace(/[a-zA-Z0-9]/g, '');
        if (invalidSpecialChars.length != 0) {
            publish('pushPopupMessage', ['FAILURE', `${invalidSpecialChars} - not part of allowed special characters: ${allowedSpecialCharacters}`]);
            return false;
        }
        publish('pushPopupMessage', ['FAILURE', 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.']);
        return false;
    } else if (password.length > 25) {
        publish('pushPopupMessage', ['FAILURE', 'Password cannot be more than 25 characters.']);
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

export function loadSignUpForm() {
    form_modal.classList.add("is-visible");
    signup_selected();
}

async function createUserAuthForm(callback) {
    var userAuthRoute = "pages/user-auth-modal.html";
    const userAuthModal = await fetch(userAuthRoute).then((data) => data.text());
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('cd-user-modal');
    modalContainer.innerHTML = userAuthModal;
    document.body.insertBefore(modalContainer,document.getElementById('main-page'));
    
    callback();
}