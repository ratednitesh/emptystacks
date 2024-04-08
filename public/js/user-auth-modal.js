import { publish } from "./event-bus";
import { forgotPassword, signIn, signUp } from "./manage-auth";
import { EVENTS } from "./const";

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

export function initUserModal() {
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
        publish('removeMenuOptions');
        loadSignUpForm();
    });
    // open modal
    main_nav.addEventListener("click", function (event) {
        publish('removeMenuOptions');
        form_modal.classList.add("is-visible");
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
                publish(EVENTS.PUSH_POPUP_MESSAGE, ['SUCCESS', 'Processing request...']);
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
                        publish(EVENTS.PUSH_POPUP_MESSAGE, ['SUCCESS', 'Processing request...']);
                        let userToken = createUserToken(username, email, password);
                        signUp(userToken);
                    }
                    else
                        publish(EVENTS.PUSH_POPUP_MESSAGE, ['FAILURE', 'Please agree to Terms & Conditions!']);
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
            publish(EVENTS.PUSH_POPUP_MESSAGE, ['SUCCESS', 'Processing request...']);
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
    document.querySelectorAll('.facebook-btn').forEach((event) => event.addEventListener("click", () => { publish(EVENTS.PUSH_POPUP_MESSAGE, ['FAILURE', 'Sorry, Facebook login not supported at the moment!']) }));
    document.querySelectorAll('.apple-btn').forEach((event) => event.addEventListener("click", () => { publish(EVENTS.PUSH_POPUP_MESSAGE, ['FAILURE', 'Sorry, Apple login not supported at the moment!']) }));
    document.querySelectorAll('.github-btn').forEach((event) => event.addEventListener("click", () => { publish(EVENTS.PUSH_POPUP_MESSAGE, ['FAILURE', 'Sorry, GitHub login not supported at the moment!']) }));
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
        publish(EVENTS.PUSH_POPUP_MESSAGE, ['FAILURE', 'Username is required.']);
        return false;
    }
    return true;
}
function validateEmail(email) {
    // Basic email validation using a regular expression
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === '') {
        publish(EVENTS.PUSH_POPUP_MESSAGE, ['FAILURE', 'email id is required.']);
        return false;
    } else if (!emailRegex.test(email)) {
        publish(EVENTS.PUSH_POPUP_MESSAGE, ['FAILURE', 'Email ID is not valid']);
        return false;
    }

    return true;
}
function validatePassword(password) {
    var allowedSpecialCharacters = '@$!%*?&';
    // Check for at least one uppercase letter, one lowercase letter, one digit, and one special character
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    if (password.trim() === '') {
        publish(EVENTS.PUSH_POPUP_MESSAGE, ['FAILURE', 'Password is required.']);
        return false;
    } else if (password.length < 8) {
        publish(EVENTS.PUSH_POPUP_MESSAGE, ['FAILURE', 'Password must be at least 8 characters long.']);
        return false;
    } else if (!passwordRegex.test(password)) {
        var invalidSpecialChars = Array.from(password).filter(char => !allowedSpecialCharacters.includes(char)).join('').replace(/[a-zA-Z0-9]/g, '');
        if (invalidSpecialChars.length != 0) {
            publish(EVENTS.PUSH_POPUP_MESSAGE, ['FAILURE', `${invalidSpecialChars} - not part of allowed special characters: ${allowedSpecialCharacters}`]);
            return false;
        }
        publish(EVENTS.PUSH_POPUP_MESSAGE, ['FAILURE', 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.']);
        return false;
    } else if (password.length > 25) {
        publish(EVENTS.PUSH_POPUP_MESSAGE, ['FAILURE', 'Password cannot be more than 25 characters.']);
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
