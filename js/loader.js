console.log("Loader.js çalışıyor!");

// Sağ için component listesi
const rightComponents = ['about', 'projects', 'experience', 'contact'];

// Sol için component listesi
const leftComponents = ['sidebar', 'menu']; // components/sidebar.html vs.

// Sağ yükleme fonksiyonu
async function loadComponent(name, targetId) {
    try {
        const response = await fetch(`components/${name}.html`);
        if (!response.ok) throw new Error(`Component bulunamadı: ${name}`);
        const html = await response.text();

        // Eski container ekleme yerine direkt HTML ekliyoruz
        document.getElementById(targetId).insertAdjacentHTML('beforeend', html);

        console.log(`${name} yüklendi → ${targetId}`);
    } catch (err) {
        console.error(err);
    }
}

// Sağ ve sol componentlerini sırayla yükle
(async function () {
    // Sağ taraf
    for (const name of rightComponents) {
        await loadComponent(name, 'right-root');
    }
    // Sol taraf
    for (const name of leftComponents) {
        await loadComponent(name, 'left-root');
    }
})();
