En// Animación suave al hacer clic en los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efecto de hover mejorado en las tarjetas de carrera
document.querySelectorAll('.career-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Simulación de navegación para los botones de carreras
document.querySelectorAll('.career-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const careerName = this.parentElement.querySelector('h3').textContent;
        
        // Aquí puedes cambiar la alerta por navegación real
        alert(`Navegando a la página de la carrera: ${careerName}\n\nEsta funcionalidad requiere crear páginas individuales para cada carrera.`);

        // Para navegación real, descomenta esta línea:
        // window.location.href = this.href;
    });
});

// Efecto parallax suave para la sección hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    parallax.style.transform = `translateY(${speed}px)`;
});

// Animación de aparición de elementos al hacer scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.career-card, .info-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate-in');
        }
    });
}

// Agregar estilos CSS para la animación de aparición
const style = document.createElement('style');
style.textContent = `
    .career-card, .info-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Ejecutar animación al cargar y al hacer scroll
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Función para mostrar/ocultar menú en dispositivos móviles
function toggleMobileMenu() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('mobile-active');
}

// Agregar botón de menú móvil dinámicamente
function addMobileMenuButton() {
    if (window.innerWidth <= 768) {
        const header = document.querySelector('.header-content');
        let mobileBtn = document.querySelector('.mobile-menu-btn');
        
        if (!mobileBtn) {
            mobileBtn = document.createElement('button');
            mobileBtn.className = 'mobile-menu-btn';
            mobileBtn.innerHTML = '☰';
            mobileBtn.onclick = toggleMobileMenu;
            header.appendChild(mobileBtn);
            
            // Agregar estilos para el botón móvil
            const mobileStyle = document.createElement('style');
            mobileStyle.textContent = `
                .mobile-menu-btn {
                    display: none;
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    padding: 0.5rem;
                    border-radius: 5px;
                    cursor: pointer;
                }
                
                @media (max-width: 768px) {
                    .mobile-menu-btn {
                        display: block;
                    }
                    
                    nav ul {
                        display: none;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background: rgba(0, 0, 0, 0.9);
                        flex-direction: column;
                        padding: 1rem;
                    }
                    
                    nav ul.mobile-active {
                        display: flex;
                    }
                }
            `;
            document.head.appendChild(mobileStyle);
        }
    }
}

// Ejecutar al cargar y al cambiar tamaño de ventana
window.addEventListener('load', addMobileMenuButton);
window.addEventListener('resize', addMobileMenuButton);

// Contador animado para estadísticas (opcional)
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Función para lazy loading de imágenes (si las agregas)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading si hay imágenes
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Mensaje de bienvenida en consola
console.log('%cBienvenido al CETIS 23 "José Vicente Villada"', 
    'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('Sitio web desarrollado con HTML5, CSS3 y JavaScript vanilla');

// Event listener para cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sitio web cargado correctamente');
    
    // Agregar clase de cargado al body
    document.body.classList.add('loaded');
    
    // Mostrar animación de entrada
    setTimeout(() => {
        animateOnScroll();
    }, 300);
});
