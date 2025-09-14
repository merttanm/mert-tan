// Experience accordion: h3'e tıklayınca detayları aç/kapat (dinamik yükleme için fonksiyon)
function enableExperienceAccordion() {
    document.querySelectorAll('.exp-toggle').forEach(function(h3) {
        h3.onclick = function() {
            const details = h3.nextElementSibling;
            if (!details) return;
            const isOpen = details.style.display === 'block';
            // Tüm başlıklardan active class'ı kaldır
            document.querySelectorAll('.exp-toggle').forEach(el => el.classList.remove('active'));
            // Tüm detayları kapat
            document.querySelectorAll('.exp-details').forEach(el => el.style.display = 'none');
            if (!isOpen) {
                details.style.display = 'block';
                h3.classList.add('active');
            }
        };
    });
}
// İlk yüklemede ve her component yüklemesinden sonra çağır
window.enableExperienceAccordion = enableExperienceAccordion;
setTimeout(enableExperienceAccordion, 500);
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
