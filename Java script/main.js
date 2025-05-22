const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

const fadeInSections = document.querySelectorAll('.preview__section, .carousel__section');
fadeInSections.forEach(section => {
  section.classList.add('fade-in');
  observer.observe(section);
});

// Плавное исчезновение .hero при прокрутке
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  if (window.scrollY > window.innerHeight * 0.5) {
    hero.classList.add('fade-out');
  } else {
    hero.classList.remove('fade-out');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const thumbs = document.querySelectorAll('.quote-thumb');

  thumbs.forEach(thumb => {
    const staticImg = thumb.style.backgroundImage;
    const gif = thumb.dataset.gif;

    thumb.addEventListener('mouseenter', () => {
      thumb.style.backgroundImage = `url('${gif}')`;
    });

    thumb.addEventListener('mouseleave', () => {
      thumb.style.backgroundImage = staticImg;
    });
  });
});
