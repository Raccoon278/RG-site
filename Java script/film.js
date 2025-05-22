document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll('.film-card');
  const buttons = document.querySelectorAll('.watch-button');

  // АНИМАЦИЯ С ПОМОЩЬЮ INTERSECTION OBSERVER
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  cards.forEach((card, index) => {
    card.classList.add(index % 2 === 0 ? 'slide-left' : 'slide-right');
    observer.observe(card);
  });

  // ВСТАВКА ПЛЕЕРОВ ПО КЛИКУ
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      // Закрываем все активные плееры
      document.querySelectorAll('.film-preview').forEach(preview => {
        if (preview.dataset.original) {
          preview.innerHTML = preview.dataset.original;
          delete preview.dataset.original;
        }
      });

      // Вставляем новый плеер
      const card = button.closest('.film-card');
      const preview = card.querySelector('.film-preview');

      if (preview.dataset.original) return; // уже открыт

      preview.dataset.original = preview.innerHTML;

      const src = button.dataset.video;
      preview.innerHTML = `
        <iframe width="100%" height="405" src="${src}" 
          frameborder="0" allow="clipboard-write; autoplay" 
          allowfullscreen></iframe>
      `;
    });
  });
});
