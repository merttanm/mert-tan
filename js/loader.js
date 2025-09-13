console.log("Loader.js çalışıyor!");

// sağ için component listesi
const rightComponents = ['about', 'projects', 'experience', 'contact'];

// sol için component listesi
const leftComponents = ['sidebar', 'menu']; // mesela components/sidebar.html vs.

// Sağ yükleme fonksiyonu
async function loadComponent(name, targetId) {
    try {
        const response = await fetch(`components/${name}.html`);
        if (!response.ok) throw new Error(`Component bulunamadı: ${name}`);
        const html = await response.text();
        const container = document.createElement('div');
        container.id = name;
        container.innerHTML = html;
        document.getElementById(targetId).appendChild(container);
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
