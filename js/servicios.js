let next = document.querySelector('.next');
let prev = document.querySelector('.prev');
let slider = document.querySelector('.slider');

// Funcionalidad para los botones de navegación
next.addEventListener('click', function () {
    let slides = document.querySelectorAll('.slides');
    slider.appendChild(slides[0]);
});

prev.addEventListener('click', function () {
    let slides = document.querySelectorAll('.slides');
    slider.prepend(slides[slides.length - 1]);
});

// Funcionalidad de deslizamiento para dispositivos móviles
let startX;

slider.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
});

slider.addEventListener('touchmove', function (e) {
    if (!startX) return;
    let moveX = e.touches[0].clientX;
    let diffX = startX - moveX;

    if (diffX > 50) {
        // Deslizar a la izquierda
        let slides = document.querySelectorAll('.slides');
        slider.appendChild(slides[0]);
        startX = null;
    } else if (diffX < -50) {
        // Deslizar a la derecha
        let slides = document.querySelectorAll('.slides');
        slider.prepend(slides[slides.length - 1]);
        startX = null;
    }
});

slider.addEventListener('touchend', function () {
    startX = null;
});
