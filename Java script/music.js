document.addEventListener("DOMContentLoaded", () => {
  const audios = document.querySelectorAll("audio");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll(".animate-on-scroll").forEach(el => observer.observe(el));

  audios.forEach(audio => {
    audio.addEventListener("play", () => {
      audios.forEach(other => {
        if (other !== audio) other.pause();
      });

      document.querySelectorAll(".main__track").forEach(track => track.classList.remove("playing"));
      audio.closest(".main__track")?.classList.add("playing");
    });

    audio.addEventListener("pause", () => {
      audio.closest(".main__track")?.classList.remove("playing");
    });
  });
});