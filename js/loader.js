console.log("Loader.js çalışıyor!");

// Sağ için component listesi (her biri ayrı div id olacak)
const rightComponents = ['about', 'projects', 'experience', 'contact'];

// Sol için component listesi
const leftComponents = ['sidebar', 'menu']; // components/sidebar.html vs.

// Component yükleme fonksiyonu
async function loadComponent(name, targetId) {
    try {
        const response = await fetch(`components/${name}.html`);
        if (!response.ok) throw new Error(`Component bulunamadı: ${name}`);
        const html = await response.text();

        // Her component kendi div içinde olacak şekilde ekleme
        let container = document.getElementById(name);
        if (!container) {
            container = document.createElement('div');
            container.id = name;
            container.classList.add('component-section'); // CSS için opsiyonel
            document.getElementById(targetId).appendChild(container);
        }

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
