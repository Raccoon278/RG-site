document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll('.main__film--card');
  const buttons = document.querySelectorAll('.main__watch--button');

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

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.main__film--preview').forEach(preview => {
        if (preview.dataset.original) {
          preview.innerHTML = preview.dataset.original;
          delete preview.dataset.original;
        }
      });

      const card = button.closest('.main__film--card');
      const preview = card.querySelector('.main__film--preview');

      if (preview.dataset.original) return; 

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
