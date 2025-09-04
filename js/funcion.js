document.addEventListener('DOMContentLoaded', function () {
    // Función para cargar contenido HTML desde un archivo
    function loadHTML(selector, elementId) {
        fetch('../index.html') // Ajusta la ruta según sea necesario
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                const content = doc.querySelector(elementId);
                if (content) {
                    document.querySelector(selector).innerHTML = content.innerHTML;
                } else {
                    console.warn(`Elemento ${elementId} no encontrado en ../index.html`);
                }
            })
            .catch(error => console.error('Error al cargar HTML:', error));
    }

    // Cargar el contenido del carrusel
    loadHTML('#carrusel', '#carrusel');
    loadHTML('#contacto', '#contacto');
    loadHTML('#whatsapp', '#whatsapp');

    // Toggle de menú
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            const nav = document.querySelector('header nav');
            if (nav) {
                nav.classList.toggle('show');
                setTimeout(() => {
                    nav.classList.toggle('active');
                }, 10); // Retraso para activar la transición
            } else {
                console.warn('Elemento <nav> no encontrado.');
            }
        });
    } else {
        console.warn('Elemento .menu-toggle no encontrado.');
    }

    // Función para ocultar el botón de WhatsApp cuando se acerque a/footer
    const footer = document.querySelector('#contacto');
    const whatsappButton = document.querySelector('#whatsapp');

    // Observador de intersección para manejar visibilidad
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                whatsappButton.style.display = 'none'; // Ocultar botón
            } else {
                whatsappButton.style.display = 'block'; // Mostrar botón
            }
        });
    });

    observer.observe(footer); // Observar el footer

    // Incorporar el toggle para el carrusel después de cargar
    function toggleCarrusel() {
        const interval = setInterval(() => {
            const carrusel = $('#carruselprincipal');
            const toggleButton = $('#pausePlayBtn');
            if (carrusel.length && toggleButton.length) {
                let autoPlayTimer = null;
                let autoPlayInterval = 5000; // Cambia a tu preferencia (milisegundos)
                let isPaused = false;

                function startAutoPlay() {
                    stopAutoPlay();
                    autoPlayTimer = setInterval(() => {
                        carrusel.carousel('next');
                    }, autoPlayInterval);
                    isPaused = false;
                    toggleButton.html('<i class="fa fa-pause"></i>');
                }

                function stopAutoPlay() {
                    if (autoPlayTimer) clearInterval(autoPlayTimer);
                    isPaused = true;
                    toggleButton.html('<i class="fa fa-play"></i>');
                }

                // Botón pausa/play
                toggleButton.off('click').on('click', function () {
                    if (isPaused) {
                        startAutoPlay();
                    } else {
                        stopAutoPlay();
                    }
                });

                // Inicia autoplay al cargar
                startAutoPlay();

                clearInterval(interval); // Detiene el intervalo cuando ya está listo
                console.log('Botón de pausa/play y autoplay configurados.');
            }
        }, 200); // Revisa cada 200ms
    }

    toggleCarrusel(); // Invoca a la función de toggleCarrusel después de que el DOM esté completamente cargado

     // Animación para la sección "Especialidades"
     const categories = document.querySelectorAll('.category');
    const especialidadesSection = document.querySelector('#especialidades');

    const especialidadesObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                categories.forEach((category, index) => {
                    setTimeout(() => {
                        category.classList.add('animate');
                    }, index * 150); // Retraso para cada categoría
                });
                especialidadesObserver.unobserve(especialidadesSection); // Dejar de observar después de animar
            }
        });
    }, { threshold: 0.2 }); // Activar cuando el 20% de la sección sea visible

    if (especialidadesSection) {
        especialidadesObserver.observe(especialidadesSection);
    }

    // Función genérica para animar secciones
    function animateSection(selector, animationClass) {
        const element = document.querySelector(selector);
        if (!element) return;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    element.classList.add(animationClass);
                    observer.unobserve(element); // Dejar de observar después de animar
                }
            });
        }, { threshold: 0.2 }); // Activar cuando el 20% de la sección sea visible

        observer.observe(element);
    }

    // Animar "Sobre Nosotros" y "Misión"
    animateSection('.nos_ima', 'animate'); // Sobre Nosotros
    animateSection('.mision_ima', 'animate'); // Misión
    animateSection('.vision_ima', 'animate'); // Visión

    // Animación para la sección "Especialistas"
    const especialistasSection = document.querySelector('#especialistas');
    if (especialistasSection) {
        const especialistasObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    especialistasSection.classList.add('animate');
                    especialistasObserver.disconnect();
                }
            });
        }, { threshold: 0.2 }); // Se activa cuando el 20% es visible
        especialistasObserver.observe(especialistasSection);
    }

    // Animación para el video de testimonio
    const videoTestimonio = document.querySelector('#video_testimonio');
    if (videoTestimonio) {
        const videoObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    videoTestimonio.classList.add('animate');
                    setTimeout(() => {
                        const video = videoTestimonio.querySelector('video');
                        if (video) {
                            video.play();
                        }
                    }, 1000);
                    videoObserver.disconnect();
                }
            });
        }, { threshold: 0.2 });
        videoObserver.observe(videoTestimonio);
    }
});

