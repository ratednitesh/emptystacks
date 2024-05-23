import { initFirebase } from "./firebase-config";
import { initStaticContent } from "./setup";
import { initRouter } from "./router";

// Importing CSS Files 
import "../css/index.css"; // Root CSS File
import "../css/es.css"; // Importing icons
import "../css/loader.css"; // Imprting Loader Screen
import "../css/buttons.css"; // Importing Buttons 

import "../css/images.css"
import "../css/divs.css";
import "../css/helper.css";
import "../css/others.css";

import "../css/header.css";
import "../css/sidebar.css";
import "../css/modals.css";
import "../css/textcourse.css";


// import "../css/style.css";
// import "../css/profile.css";
// import "../css/comment.css";
// import "../css/form.css";
// import "../css/reviews.css";
// import "../css/textsection.css";
// import "../css/watchvideo.css";




window.addEventListener('DOMContentLoaded', function () {
  initFirebase().then(() => {
    initStaticContent();
    initRouter();
    document.querySelector('.preloader').classList.add('disabled');
  });
});