document.addEventListener('DOMContentLoaded', () => {
    // Плавная прокрутка для навигации
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Инициализация GSAP ScrollTrigger для каждой секции
    gsap.registerPlugin(ScrollTrigger);
    
    document.querySelectorAll('.parallax-section').forEach((section) => {
        const bg = section.querySelector('.parallax-bg');
        const content = section.querySelector('.content-wrapper');

        // Параллакс эффект для фона
        gsap.to(bg, {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        // Анимация появления контента
        gsap.from(content, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: "top center",
                end: "center center",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Подсветка активного пункта меню
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    document.querySelectorAll('.parallax-section').forEach((section) => {
        observer.observe(section);
    });
}); 