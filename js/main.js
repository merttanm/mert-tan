// Profil ikonlarına tıklanınca link açılmazsa uyarı göster (event delegation)
document.querySelector('.sidebar')?.addEventListener('click', function(e) {
    const link = e.target.closest('.icon-link');
    if (!link) return;
    // Sadece mailto hariç dış linkler için kontrol
    if (link.href.startsWith('mailto:')) return;
    // 100ms sonra kontrol: yeni sekme açıldı mı?
    setTimeout(function() {
        if (document.hasFocus()) {
            alert('Bağlantı açılmıyorsa, lütfen tarayıcı ayarlarınızı veya pop-up engelleyicinizi kontrol edin.');
        }
    }, 100);
});
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
