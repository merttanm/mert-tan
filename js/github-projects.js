// js/github-projects.js
// GitHub API'den merttanm kullanıcısının en önemli projelerini çekip projects.html'e ekler

async function fetchAndDisplayGithubProjects() {
  const username = 'merttanm';
  const apiUrl = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;
  const container = document.getElementById('projects-list');
  if (!container) return;
  container.innerHTML = '<div class="loading">Projeler yükleniyor...</div>';
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error('GitHub API hatası');
    const repos = await res.json();
    // Yıldız ve açıklama sıralaması
    repos.sort((a, b) => (b.stargazers_count - a.stargazers_count) || (b.forks_count - a.forks_count));
    // En önemli ilk 6 proje
    const top = repos.slice(0, 6);
    container.innerHTML = top.map(repo => `
      <div class="project-card">
        <div class="project-title-row">
          <a href="${repo.html_url}" target="_blank" rel="noopener" class="project-title">${repo.name}</a>
          <span class="project-stars">★ ${repo.stargazers_count}</span>
        </div>
        <div class="project-desc">${repo.description ? repo.description : 'Açıklama yok.'}</div>
        <div class="project-meta">
          <span>Fork: ${repo.forks_count}</span>
          <span>Dil: ${repo.language || 'Bilinmiyor'}</span>
        </div>
      </div>
    `).join('');
  } catch (e) {
    container.innerHTML = '<div class="error">Projeler yüklenemedi.</div>';
  }
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayGithubProjects);
