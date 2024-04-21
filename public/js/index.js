import { initEventBus } from "./event-bus";
import { initFirebase } from "./firebase-config";
import { initStaticContent } from "./setup";
import { initRouter } from "./router";
import "../css/main.css";
import "../css/style.css";
import "../css/loader.css";
import "../css/buttons.css";
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
import "../css/reviews.css";
import "../css/textcourse.css";
import "../css/textsection.css";
import "../css/watchvideo.css";
import "../css/footer.css";
import "../css/icon.css";

window.addEventListener('DOMContentLoaded', function () {
  initFirebase().then(() => {
    initEventBus();
    initStaticContent();
    initRouter();
    document.querySelector('.preloader').classList.add('inactive');
  });
});