// Плавное скрытие шапки при скролле
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
    });
});