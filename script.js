 // Basic interactivity: search, open modal on card click, keyboard accessibility
document.addEventListener('DOMContentLoaded', () => {
  const search = document.getElementById('search');
  const clearBtn = document.getElementById('clearSearch');
  const grid = document.getElementById('examsGrid');
  const cards = Array.from(grid.querySelectorAll('.card'));
  const modal = document.getElementById('examModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const goExam = document.getElementById('goExam');
  const closeBtn = document.getElementById('closeBtn');
  const modalClose = document.querySelector('.modal-close');


  // Highlight matching text utility
  function highlight(text, query) {
    if (!query) return text;
    const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
    return text.replace(re, '<mark>$1</mark>');
  }

  function filter(q) {
    const v = q.trim().toLowerCase();
    let anyVisible = false;
    cards.forEach(c => {
      const name = c.dataset.exam;
      const visible = !v || name.toLowerCase().includes(v);
      c.style.display = visible ? '' : 'none';
      // Highlight exam name
      const h3 = c.querySelector('h3');
      if (h3) {
        h3.innerHTML = visible && v ? highlight(name, v) : name;
      }
      if (visible) anyVisible = true;
    });
    // Show/hide no results message
    const noResults = document.getElementById('noResults');
    if (noResults) noResults.style.display = anyVisible ? 'none' : '';
  }

  search.addEventListener('input', e => filter(e.target.value));
  clearBtn.addEventListener('click', () => { search.value=''; filter(''); search.focus(); });


  // Utility to get page name from exam
  function examToPage(exam) {
    return exam.toLowerCase().replace(/\s*\(.*?\)/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '') + '.html';
  }

  // Navigate to exam page on card click
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const exam = card.dataset.exam;
      window.location.href = examToPage(exam);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const exam = card.dataset.exam;
        window.location.href = examToPage(exam);
      }
    });
  });

  // 'Open Exam Page' button always goes to the first visible card's page (for accessibility)
  goExam.addEventListener('click', (e) => {
    e.preventDefault();
    const visibleCard = cards.find(c => c.style.display !== 'none');
    if (visibleCard) {
      const exam = visibleCard.dataset.exam;
      window.location.href = examToPage(exam);
    }
  });

  // Theme toggle (light/dark simulation)
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', ()=>{
    const pressed = themeToggle.getAttribute('aria-pressed') === 'true';
    themeToggle.setAttribute('aria-pressed', String(!pressed));
    if(!pressed){
      document.documentElement.style.setProperty('--bg-1','linear-gradient(180deg,#f7f9ff 0%, #eef3ff 100%)');
      document.documentElement.style.setProperty('--muted','#556070');
      document.documentElement.style.setProperty('color-scheme','light');
    } else {
      document.documentElement.style.setProperty('--bg-1','linear-gradient(180deg,#0f172a 0%, #071026 100%)');
      document.documentElement.style.setProperty('--muted','#9aa4b2');
      document.documentElement.style.setProperty('color-scheme','dark');
    }
  });
});