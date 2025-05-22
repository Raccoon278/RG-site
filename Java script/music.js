document.addEventListener("DOMContentLoaded", () => {
  const audios = document.querySelectorAll("audio");

  // Анимация появления
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll(".animate-on-scroll").forEach(el => observer.observe(el));

  // Остановка других треков при воспроизведении
  audios.forEach(audio => {
    audio.addEventListener("play", () => {
      audios.forEach(other => {
        if (other !== audio) other.pause();
      });

      // Подсветка активного трека
      document.querySelectorAll(".track").forEach(track => track.classList.remove("playing"));
      audio.closest(".track")?.classList.add("playing");
    });

    audio.addEventListener("pause", () => {
      audio.closest(".track")?.classList.remove("playing");
    });
  });
});
