console.log("Loader.js çalışıyor!");

// Sağ için component listesi (her biri ayrı div id olacak)
const rightComponents = ['about', 'projects', 'experience', 'contact'];

// Sol için component listesi
const leftComponents = ['sidebar']; // componßents/sidebar.html vs.

// Component yükleme fonksiyonu
async function loadComponent(name, targetId) {
    try {
        const response = await fetch(`components/${name}.html`);
        if (!response.ok) throw new Error(`Component bulunamadı: ${name}`);
        const html = (await response.text()).trim();

        // ...existing code...
        // İçerik tamamen boşsa veya sadece boş etiket/boşluk varsa kutu ekleme
        const visibleContent = html.replace(/<[^>]*>/g, '').replace(/\s|&nbsp;/g, '').trim();
        if (!html || visibleContent === '') {
            console.log(`${name} componenti boş, eklenmedi.`);
            return;
        }
        // ...existing code...
        // Her component kendi div içinde olacak şekilde ekleme
        let container = document.getElementById(name);

        // Eğer hedef (targetId) bulunmuyorsa hata ver ve dur
        const target = document.getElementById(targetId);
        if (!target) {
            console.error(`Target element bulunamadı: ${targetId}`);
            return;
        }

        // Container yoksa oluştur, varsa var olanı kullan
        if (!container) {
            container = document.createElement('div');
            container.id = name;
        
            target.appendChild(container);
        } else {
            console.log(`${name} div zaten var, tekrar oluşturulmadı.`);
        }

        // HTML içeriğini bas
        container.innerHTML = html;
        console.log(`${name} yüklendi → ${targetId}`);


    } catch (err) {
        console.error(err);
    }
}

// Sağ ve sol componentlerini sırayla yükle
(async function () {
    for (const name of rightComponents) {
        await loadComponent(name, 'right-root');
    }
    for (const name of leftComponents) {
        await loadComponent(name, 'left-root');
    }
})();

console.log("Main.js çalışıyor!");

// Sidebar linklerine tıklayınca ilgili sağ component'e kaydır
document.getElementById('left-root').addEventListener('click', e => {
    const link = e.target.closest('a');
    if (!link) return;

    e.preventDefault();
    const targetId = link.getAttribute('href').replace('.html', ''); // about.html -> about
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});



