
export function loadCourseDetails() {


    document.querySelectorAll('.accordion-header').forEach(function (header) {
        header.addEventListener('click', function () {
            var item = this.parentNode;
            item.classList.toggle('active');
            if (this.children[0].children[1].classList[2] == 'fa-angle-down')
                this.children[0].children[1].classList.replace('fa-angle-down', 'fa-angle-up');
            else
                this.children[0].children[1].classList.replace('fa-angle-up', 'fa-angle-down');

        });
    });
    document.getElementById("expand-button").addEventListener('click', () => {
        var expandItems = document.querySelectorAll('.expand');

        var accordionItems = document.querySelectorAll('.accordion-item');
        accordionItems.forEach(function (item) {
            item.classList.add('active');
        });
        expandItems.forEach(function (expandItem) {
            expandItem.classList.replace('fa-angle-down', 'fa-angle-up');
        });
        document.getElementById("collapse-button").hidden = false;
        document.getElementById("expand-button").hidden = true;

    });
    document.getElementById("collapse-button").addEventListener('click', () => {
        var accordionItems = document.querySelectorAll('.accordion-item');
        var expandItems = document.querySelectorAll('.expand');

        accordionItems.forEach(function (item) {
            item.classList.remove('active');

        });
        expandItems.forEach(function (expandItem) {
            expandItem.classList.replace('fa-angle-up', 'fa-angle-down');
        });
        document.getElementById("collapse-button").hidden = true;
        document.getElementById("expand-button").hidden = false;
    });

}
