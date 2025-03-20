document.addEventListener('DOMContentLoaded', () => {
    // Плавная прокрутка для навигации
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Сворачиваем все окна описаний
            document.querySelectorAll('.content-wrapper').forEach(wrapper => {
                if (!wrapper.classList.contains('collapsed')) {
                    const info = wrapper.querySelector('.animal-info');
                    wrapper.classList.add('collapsed');
                    gsap.to(info, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.3,
                        ease: "power2.in",
                        onComplete: () => {
                            info.style.visibility = 'hidden';
                        }
                    });
                }
            });

            // Плавно прокручиваем к новой секции
            targetSection.scrollIntoView({ behavior: 'smooth' });

            // Показываем новое окно описания
            const newContent = targetSection.querySelector('.content-wrapper');
            const newInfo = newContent.querySelector('.animal-info');
            
            // Сразу подготавливаем контент
            newInfo.style.visibility = 'visible';
            newInfo.style.opacity = '0';
            newInfo.style.transform = 'scale(0.8)';
            newContent.classList.remove('collapsed');
            
            // Анимируем появление
            gsap.to(newInfo, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });

    // Обработчики для кнопок сворачивания/разворачивания
    document.querySelectorAll('.toggle-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const wrapper = button.closest('.content-wrapper');
            const info = wrapper.querySelector('.animal-info');
            
            if (wrapper.classList.contains('collapsed')) {
                // Разворачиваем
                wrapper.classList.remove('collapsed');
                gsap.to(info, {
                    opacity: 1,
                    scale: 1,
                    visibility: 'visible',
                    duration: 0.5,
                    ease: "power2.out"
                });
            } else {
                // Сворачиваем
                wrapper.classList.add('collapsed');
                gsap.to(info, {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.5,
                    ease: "power2.in",
                    onComplete: () => {
                        info.style.visibility = 'hidden';
                    }
                });
            }
        });
    });

    // Обработчик для кнопки возврата наверх
    const scrollTopButton = document.querySelector('.scroll-top-button');
    const container = document.querySelector('.parallax-container');
    
    // Показываем/скрываем кнопку при прокрутке
    container.addEventListener('scroll', () => {
        if (container.scrollTop > window.innerHeight / 2) {
            scrollTopButton.classList.remove('hidden');
        } else {
            scrollTopButton.classList.add('hidden');
        }
    });

    // Обработчик клика по кнопке
    scrollTopButton.addEventListener('click', () => {
        container.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Начальное состояние кнопки
    scrollTopButton.classList.add('hidden');

    // Инициализация GSAP ScrollTrigger для каждой секции
    gsap.registerPlugin(ScrollTrigger);
    
    document.querySelectorAll('.parallax-section').forEach((section) => {
        const bg = section.querySelector('.parallax-bg');
        
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
    });

    // Подсветка активного пункта меню
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const navigationObserver = new IntersectionObserver((entries) => {
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
        navigationObserver.observe(section);
    });
}); 