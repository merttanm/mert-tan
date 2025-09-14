// js/projects-carousel.js
// Carousel animasyonunu sonsuz döngü için kartları kopyalar

document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.getElementById('projects-carousel');
  if (!carousel) return;
  // Kartları iki kez ekle ki animasyon sonsuz döngü gibi görünsün
  carousel.innerHTML += carousel.innerHTML;
});
