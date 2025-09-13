console.log("Main.js çalışıyor!");

// Dinamik olarak eklenen linkleri yakalamak için event delegation
document.getElementById('left-root').addEventListener('click', e => {
    const link = e.target.closest('a'); // tıklanan element <a> mı kontrol et
    if (!link) return;

    e.preventDefault();
    const targetId = link.getAttribute('href').replace('.html', ''); // about.html -> about
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});
