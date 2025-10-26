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
document.getElementById('printBtn').addEventListener('click', () => {
    window.print();
});

// Función para descargar como PDF (simulada)
document.getElementById('downloadPdf').addEventListener('click', () => {
    // En una implementación real, aquí usarías una librería como jsPDF
    // o un servicio externo para generar el PDF
    
    alert('En una implementación completa, aquí se generaría el PDF. Por ahora, puedes usar la función de imprimir y "Guardar como PDF".');
    
    // Alternativa: abrir diálogo de impresión para guardar como PDF
    // window.print();
});

// Smooth scroll para enlaces internos (si los hubiera)
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

// Efectos de hover en tarjetas de proyecto
document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(10px)';
        item.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0)';
    });
});

// Contador de estadísticas (opcional)
function initStats() {
    const stats = [
        { element: '.projects-count', target: 15, duration: 2000 },
        { element: '.clients-count', target: 12, duration: 2000 },
        { element: '.experience-years', target: 3, duration: 2000 }
    ];
    
    stats.forEach(stat => {
        const element = document.querySelector(stat.element);
        if (element) {
            animateCounter(element, 0, stat.target, stat.duration);
        }
    });
}

function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + (end > 10 ? '+' : '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Validación de formulario (si se agrega un formulario de contacto)
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Validación básica
            const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#ff4444';
                    isValid = false;
                } else {
                    input.style.borderColor = '#00d4ff';
                }
            });
            
            if (isValid) {
                // Simular envío
                alert('Mensaje enviado correctamente. Te contactaré pronto.');
                contactForm.reset();
            } else {
                alert('Por favor, completa todos los campos requeridos.');
            }
        });
    }
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
    // Animar barras de habilidades
    setTimeout(animateSkillBars, 1000);
    
    // Inicializar efectos
    typeWriterEffect();
    initFormValidation();
    
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
    
    // Actualizar año actual en el copyright (si se agrega)
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
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