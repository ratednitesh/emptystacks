
import { initEventBus } from "./event-bus";
import { initFirebase } from "./firebase-config";
import { initGlobalEvents } from "./global-events";
import { initHeaders } from "./header";
import { initAuthentication } from "./manage-auth";
import { initRouter } from "./router";
import { initUserModal } from "./user-auth-modal";
import "../css/style.css";
import "../css/core.css";
import "../css/profile.css";
import "../css/header.css";
import "../css/sidebar.css";
import "../css/usermodal.css";
import "../css/about.css";
import "../css/comment.css";
import "../css/contact.css";
import "../css/courses.css";
import "../css/form.css";
import "../css/home.css";
import "../css/playlist.css";
import "../css/reviews.css";
import "../css/textcourse.css";
import "../css/textsection.css";
import "../css/watchvideo.css";

document.addEventListener('DOMContentLoaded', function () {

  // Initialize App
  initFirebase().then(() => {
    initEventBus();
    initGlobalEvents();
    initHeaders();
    initAuthentication();
    initRouter();
    initUserModal();
  });
  // Check User Log In status
});

window.addEventListener('load', function () {
  // All resources are loaded, hide the preloader
  document.querySelector('.preloader').classList.add('inactive');
});