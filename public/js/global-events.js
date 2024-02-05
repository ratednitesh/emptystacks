import { publish } from "./event-bus";

    
    export function initGlobalEvents(){
        document.addEventListener("click", function (event) { publish('globalClickEvent',event);});
        document.addEventListener("keyup", function (event) { publish('globalKeyEvent',event);});

    }
    
  