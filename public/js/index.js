import { initStaticContent } from "./setup";
import { initRouter } from "./router";
import { initServices } from "./services";

// Importing CSS Files 
import "../css/index.css"; // Root CSS File
import "../css/es.css"; // Importing icons
import "../css/loader.css"; // Imprting Loader Screen
import "../css/buttons.css"; // Importing Buttons 
import "../css/images.css" // All images related css
import "../css/divs.css"; // All Div level css
import "../css/helper.css"; // hlper css
import "../css/others.css"; // other page specific css
// OTHER CSS
import "../css/header.css";
import "../css/sidebar.css";
import "../css/modals.css";
import "../css/reviews.css";

import "../css/comment.css";
import "../css/textsection.css";
import "../css/watchvideo.css";


window.addEventListener('DOMContentLoaded', function () {
  initServices().then(() => {
    initStaticContent();
    initRouter();
    document.querySelector('.preloader').classList.add('disabled');
  });
});