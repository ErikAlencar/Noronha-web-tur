const btn = document.getElementById("btnNoronha");
const menu = document.getElementById("menuNoronha");
const header = document.querySelector("header");

btn.addEventListener("click", () => {
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
});

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("shrink");
    } else {
        header.classList.remove("shrink");
    }
});

// Carrossel autoplay e controles
document.addEventListener('DOMContentLoaded', () => {
    const slides = Array.from(document.querySelectorAll('.carrosel .list-item'));
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const indicatorsWrap = document.querySelector('.carousel-indicators');
    let current = slides.findIndex(s => s.classList.contains('active')) || 0;
    let interval = null;
    const delay = 3500;

    function renderIndicators() {
        indicatorsWrap.innerHTML = '';
        slides.forEach((_, i) => {
            const b = document.createElement('button');
            if (i === current) b.classList.add('active');
            b.addEventListener('click', () => goTo(i));
            indicatorsWrap.appendChild(b);
        })
    }

    function update() {
        slides.forEach((s, i) => s.classList.toggle('active', i === current));
        const dots = Array.from(indicatorsWrap.children);
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function next() { current = (current + 1) % slides.length; update(); }
    function prev() { current = (current - 1 + slides.length) % slides.length; update(); }
    function goTo(i) { current = i; update(); }

    function start() { stop(); interval = setInterval(next, delay); }
    function stop() { if (interval) clearInterval(interval); }

    prevBtn.addEventListener('click', () => { prev(); start(); });
    nextBtn.addEventListener('click', () => { next(); start(); });

    // Pause on hover
    const carousel = document.querySelector('.carrosel');
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);

    renderIndicators();
    update();
    start();
});