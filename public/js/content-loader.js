export function loadContentSidebar() {
    let sideBar = document.querySelector('.side-bar');
    let menuBtn = document.querySelector('#menu-btn');
    menuBtn.style.display = "inline-block";

    sideBar.classList.add('active');
    document.body.classList.add('active');
    document.querySelector('#menu-btn').onclick = () => {
        sideBar.classList.toggle('active');
        document.body.classList.toggle('active');

    }
    document.querySelector('.side-bar .close-side-bar').onclick = () => {
        sideBar.classList.remove('active');
        document.body.classList.remove('active');

    }
    // Assuming you have the necessary HTML structure
    let subMenus = document.querySelectorAll(".sub-menu > a");
    subMenus.forEach(function (link) {
        link.addEventListener("click", function (e) {
            // Close all other sub-menus
            document.querySelectorAll(".sidebar .sub-menu ul").forEach(function (submenu) {
                if (submenu !== link.nextElementSibling) {
                    submenu.style.display = "none";
                }
            });
            // Toggle the visibility of the clicked sub-menu
            if (link.nextElementSibling.style.display == "" || link.nextElementSibling.style.display == "none") {
                link.nextElementSibling.style.display = "block";
            } else {
                link.nextElementSibling.style.display = "none";
            }

            // Prevent the click event from propagating up the DOM hierarchy
            e.stopPropagation();
        });
    });
}

export function loadContentMainSection() {
 // TODO: to be completed later.
}