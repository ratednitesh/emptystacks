document.addEventListener('DOMContentLoaded', function () {
    var form_modal = document.querySelector(".cd-user-modal");
    var form_login = document.querySelector("#cd-login");
    var form_signup = document.querySelector("#cd-signup");
    var form_forgot_password = document.querySelector("#cd-reset-password");
    var form_modal_tab = document.querySelector(".cd-switcher");
    var tab_login = form_modal_tab.children[0].children[0];
    var tab_signup = form_modal_tab.children[1].children[0];
    var forgot_password_link = form_login.querySelector(".cd-form-bottom-message a");
    var back_to_login_link = form_forgot_password.querySelector(".cd-form-bottom-message a");
    var main_nav = document.querySelector("#sign-up");
    var startJourney = document.querySelector('#start-journey');
    // start journey
    startJourney.addEventListener("click", function(){
      form_modal.classList.add("is-visible");
      signup_selected();
    });
    // open modal
    main_nav.addEventListener("click", function (event) {
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
  
    // close modal
    document.addEventListener("click", function (event) {
      if (event.target === form_modal || event.target.classList.contains("cd-close-form")) {
        form_modal.classList.remove("is-visible");
      }
    });
  
    // close modal when clicking the esc keyboard button
    document.addEventListener("keyup", function (event) {
      if (event.which === 27) {
        form_modal.classList.remove("is-visible");
      }
    });
  
    // switch from a tab to another
    form_modal_tab.addEventListener("click", function (event) {
      event.preventDefault();
      event.target === tab_login ? login_selected() : signup_selected();
    });
  
    // hide or show password
    document.querySelector(".hide-password").addEventListener("click", function () {
      var passwordField = this.previousElementSibling;
  
      passwordField.type = passwordField.type === "password" ? "text" : "password";
      this.textContent = passwordField.type === "password" ? "Show" : "Hide";
  
      // focus and move cursor to the end of input field
      passwordField.putCursorAtEnd();
    });
  
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
  
    // REMOVE THIS - it's just to show error messages
    form_login.querySelector('input[type="submit"]').addEventListener("click", function (event) {
      event.preventDefault();
      form_login.querySelector('input[type="email"]').classList.toggle("has-error");
      form_login.querySelector(".cd-form-bottom-message span").classList.toggle("is-visible");
    });
  
    form_signup.querySelector('input[type="submit"]').addEventListener("click", function (event) {
      event.preventDefault();
      form_signup.querySelector('input[type="email"]').classList.toggle("has-error");
      form_signup.querySelector(".cd-form-bottom-message span").classList.toggle("is-visible");
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
  });
  
  // credits https://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
  HTMLElement.prototype.putCursorAtEnd = function () {
    if (this.setSelectionRange) {
      var len = this.value.length * 2;
      this.setSelectionRange(len, len);
    } else {
      this.value = this.value;
    }
  };
  