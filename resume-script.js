// Animación de barras de habilidades
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = level + '%';
        }, 500);
    });
}

// Función para imprimir el currículum
function initPrintButton() {
    const printBtn = document.getElementById('printBtn');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }
}

// Smooth scroll para enlaces internos (si los hubiera)
function initSmoothScroll() {
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
}

// Efecto de escritura en el resumen profesional
function typeWriterEffect() {
    const summaryElement = document.querySelector('.section-content p');
    if (summaryElement) {
        const text = summaryElement.textContent;
        summaryElement.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                summaryElement.textContent += text.charAt(i);
                i++;
                setTimeout(type, 30);
            }
        }
        
        // Iniciar efecto cuando el elemento sea visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    type();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(summaryElement);
    }
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado - JavaScript funcionando correctamente');
    
    // Inicializar funciones
    initPrintButton();
    initSmoothScroll();
    
    // Animar barras de habilidades después de un delay
    setTimeout(animateSkillBars, 1000);
    
    // Inicializar efecto de escritura
    typeWriterEffect();
    
    // Efecto de aparición gradual al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    document.querySelectorAll('.section, .skill-category, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Modo oscuro/claro (para futura implementación)
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-theme');
    
    // Guardar preferencia en localStorage
    const isLight = body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Cargar tema guardado
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
}

// Llamar al cargar la página
loadTheme();