const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

const fadeInSections = document.querySelectorAll('.main__preview--section, .main__carousel--section');
fadeInSections.forEach(section => {
  section.classList.add('fade-in');
  observer.observe(section);
});

const hero = document.querySelector('.main__hero');
window.addEventListener('scroll', () => {
  if (window.scrollY > window.innerHeight * 0.5) {
    hero.classList.add('fade-out');
  } else {
    hero.classList.remove('fade-out');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const thumbs = document.querySelectorAll('.main__quote--gif');

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
setInterval(() => {
  const carousel = document.querySelector('.main__carousel--track');
  if (carousel) {
    carousel.scrollBy({ left: 260, behavior: 'smooth' });
  }
}, 3000);
