let bannerInterval;
export function loadHome() {
    // document.querySelectorAll('.banner-slide').forEach((event)=>{event.addEventListener('load',()=>{console.log('image loaded')})});
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const targetImage = entry.target;
            document.querySelector('.image-loader').style.display = "none";
            targetImage.style.opacity = 1;
              observer.unobserve(targetImage);
            
          }
        });
      });
      
      const bannerSlides = document.querySelectorAll('.banner-slide');
      bannerSlides.forEach(bannerSlide => {
        bannerSlide.style.opacity = 0; // Initially hide the images
        observer.observe(bannerSlide);
      });
      
    const enrolledCourses = document.querySelectorAll(".book .cover");
    // enrolledCourses.forEach((enrolledCourse, i=0)=>{console.log(enrolledCourse.style);console.log(i);enrolledCourse.style.zIndex=i++;});
    let index = 0;
    if (enrolledCourses.length != 0)
        enrolledCourses[index].classList.add("visible");
    // enrolledCourses[index].style.display="block";

    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");
    if (nextBtn != null)
        nextBtn.addEventListener("click", (_) => {
            enrolledCourses[index].classList.replace('visible', 'hidden');
            if (index == enrolledCourses.length - 1) {
                index = -1;
            }
            enrolledCourses[++index].classList.replace('hidden', 'visible');
        });
    if (prevBtn != null)
        prevBtn.addEventListener("click", (_) => {

            enrolledCourses[index].classList.replace('visible', 'hidden');
            if (index == 0) {
                index = enrolledCourses.length;
            }
            enrolledCourses[--index].classList.replace('hidden', 'visible');

        });

    let i = 1;
    bannerInterval = setInterval(() => { showSlide(i++); if (i > 3) i = 1; }, 3500);
    document.getElementById('slide-1').addEventListener('click', () => { showSlide(1); });
    document.getElementById('slide-2').addEventListener('click', () => { showSlide(2); });
    document.getElementById('slide-3').addEventListener('click', () => { showSlide(3); });
}
export function unloadHome() {
    clearInterval(bannerInterval);
}

function showSlide(n) {
    setSlide(n);

}

function setSlide(index) {
    let slides = document.querySelectorAll('.banner-slide');
    let dots = document.querySelectorAll(".slider .fa-circle");
    if (index > slides.length)
        index = 1;
    if (index < 1)
        index = slides.length;
    dots.forEach((node, i) => { if (index - 1 == i) node.classList.replace('fa-regular', 'fa-solid'); else node.classList.replace('fa-solid', 'fa-regular'); })
    slides.forEach((node, i) => { if (index - 1 == i) node.style.display = "block"; else node.style.display = "none"; })

}
export function loadMainSidebar() {
    let menuBtn = document.querySelector('#menu-btn');
    menuBtn.style.display = "inline-block";
    let sideBar = document.querySelector('.side-bar');
    sideBar.classList.remove('active');
    document.body.classList.remove('active');
    document.querySelector('#menu-btn').onclick = () => {
        sideBar.classList.toggle('active');
        document.body.classList.toggle('active');

    }
    document.querySelector('.side-bar .close-side-bar').onclick = () => {
        sideBar.classList.remove('active');
        document.body.classList.remove('active');

    }
}

export function unloadSideBar() {
    document.getElementById("side-bar").innerHTML = "";
    document.body.classList.remove('active');
    let menuBtn = document.querySelector('#menu-btn');
    menuBtn.style.display = "none";

}