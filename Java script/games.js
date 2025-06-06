document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.main__card');
    let currentModal = null;

    function closeModal() {
        if (!currentModal) return;
        currentModal.overlay.classList.remove('active');
        currentModal.modal.classList.remove('active');
        setTimeout(() => {
            currentModal.overlay.remove();
            currentModal = null;
        }, 300);
    }

    function showModal(gameName, type) {
        const folderName = gameName.toLowerCase().replace(/\s+/g, ' ');
        const modalPath = `more/${folderName}/${folderName}_${type}/index.html`;

        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';

        const modal = document.createElement('div');
        modal.className = type === 'buy' ? 'modal-purchase' : 'modal-more';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'modal-close';
        closeBtn.innerHTML = '✕';
        closeBtn.onclick = closeModal;

        fetch(modalPath)
            .then(response => {
                if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
                return response.text();
            })
            .then(data => {
                modal.innerHTML = data;
                modal.prepend(closeBtn);
                overlay.appendChild(modal);
                document.body.appendChild(overlay);

                setTimeout(() => {
                    overlay.classList.add('active');
                    modal.classList.add('active');
                }, 10);

                currentModal = { overlay, modal };
            })
            .catch(error => {
                console.error('Ошибка загрузки модалки:', error);
                modal.innerHTML = `
                    <div class="error-content">
                        <h3>Ошибка загрузки</h3>
                        <p>${error.message}</p>
                        <p>Путь: ${modalPath}</p>
                    </div>
                `;
                modal.prepend(closeBtn);
                overlay.appendChild(modal);
                document.body.appendChild(overlay);
            });
    }

    document.querySelectorAll('.main__card--btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            const card = e.target.closest('.main__card');
            const gameName = card.querySelector('h3').textContent;
            showModal(gameName, 'more');
        });
    });

    cards.forEach(card => {
        card.addEventListener('click', e => {
            if (!e.target.closest('.main__card--btn')) {
                const gameName = card.querySelector('h3').textContent;
                showModal(gameName, 'buy');
            }
        });
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeModal();
    });

    document.addEventListener('click', e => {
        if (currentModal && e.target === currentModal.overlay) closeModal();
    });
});
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll('.watch-button');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.main__card').forEach(card => {
        const preview = card.querySelector('.film-preview');
        if (preview.dataset.original) {
          preview.innerHTML = preview.dataset.original;
        }
      });

      const card = btn.closest('.main__card');
      const preview = card.querySelector('.film-preview');
      preview.dataset.original = preview.innerHTML;

      const src = btn.dataset.video;
      preview.innerHTML = `
        <iframe width="100%" height="405" src="${src}" 
          frameborder="0" allow="clipboard-write; autoplay" 
          allowfullscreen></iframe>
      `;
    });
  });
});
