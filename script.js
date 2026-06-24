// Hamburger Menu
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("menu-nav");
const btnNoronha = document.getElementById("btnNoronha");
const menuNoronha = document.getElementById("menuNoronha");
const header = document.querySelector("header");

// Toggle hamburger
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});


// Fechar menu ao clicar em um link
document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

// Submenu dropdown no mobile
btnNoronha.addEventListener("click", () => {
    menuNoronha.style.display = menuNoronha.style.display === "block" ? "none" : "block";
});

// Fechar submenu ao clicar em um link
document.querySelectorAll(".submenu a").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        menuNoronha.style.display = "none";
    });
});

// Header scroll shrink e fechar submenu
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("shrink");
        // fechar menu móvel e estado do hamburger ao rolar
        if (navMenu.classList.contains("active")) {
            navMenu.classList.remove("active");
        }
        if (hamburger.classList.contains("active")) {
            hamburger.classList.remove("active");
        }
        // fechar submenu interno
        menuNoronha.style.display = "none";
    } else {
        header.classList.remove("shrink");
    }

    // Fechar submenu Noronha ao fazer scroll em telas grandes
    if (window.innerWidth > 768) {
        menuNoronha.style.display = "none";
    }
});

// Carrossel autoplay e controles
document.addEventListener('DOMContentLoaded', () => {
    const slides = Array.from(document.querySelectorAll('.carrosel .list-item'));
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const indicatorsWrap = document.querySelector('.carousel-indicators');

    // Validação para garantir que os elementos existem
    if (!slides.length || !prevBtn || !nextBtn || !indicatorsWrap) {
        console.warn('Elementos do carrosel não encontrados');
        return;
    }

    let current = slides.findIndex(s => s.classList.contains('active')) || 0;
    let interval = null;
    // Delay maior em telas menores para mudar mais de vagar
    const delay = window.innerWidth <= 768 ? 5500 : 3500;

    function renderIndicators() {
        indicatorsWrap.innerHTML = '';
        slides.forEach((_, i) => {
            const b = document.createElement('button');
            if (i === current) b.classList.add('active');
            b.addEventListener('click', () => { goTo(i); start(); });
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