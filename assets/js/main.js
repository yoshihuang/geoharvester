// 工作實績資料來自 assets/data/projects.js（window.PROJECTS_DATA），請以 admin.html 維護。
const CAT_ORDER = ['大規模崩塌', '地質調查', '山坡地與集水區', '溫泉', '資訊系統'];

// 依年度（取區間最後一年）由新到舊排序；同年度維持資料檔順序
const yearKey = y => Math.max(...(String(y).match(/\d+/g) || ['0']).map(Number));
const PROJECTS = (window.PROJECTS_DATA || [])
  .map((p, i) => ({ ...p, _i: i }))
  .sort((a, b) => yearKey(b.year) - yearKey(a.year) || a._i - b._i);

const extraCats = [...new Set(PROJECTS.map(p => p.category))].filter(c => c && !CAT_ORDER.includes(c));
const CATS = ['全部', ...CAT_ORDER.filter(c => PROJECTS.some(p => p.category === c)), ...extraCats];

const PREVIEW = 12; // 「全部」分類預設顯示筆數
let expanded = false;

const esc = s => String(s ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

function renderProjects(cat) {
  const tbody = document.getElementById('project-rows');
  const all = PROJECTS.filter(p => cat === '全部' || p.category === cat);
  const limit = cat === '全部' && !expanded;
  const rows = limit ? all.slice(0, PREVIEW) : all;
  const more = document.getElementById('project-more');
  more.hidden = !(cat === '全部' && all.length > PREVIEW);
  more.textContent = expanded ? '收合' : `顯示全部 ${all.length} 件`;
  tbody.innerHTML = rows.map(p => {
    const tag = cat === '全部' ? `<span class="cat">${esc(p.category)}</span>` : '';
    const st = p.status && p.status !== '已完成' ? `<span class="status">${esc(p.status)}</span>` : '';
    return `<tr><td>${esc(p.year)}</td><td>${tag}${esc(p.name)}${st}</td><td>${esc(p.client)}</td></tr>`;
  }).join('');
}

function initFilters() {
  const box = document.querySelector('.filters');
  CATS.forEach((c, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    b.textContent = c;
    b.addEventListener('click', () => {
      box.querySelectorAll('button').forEach(x => x.setAttribute('aria-selected', 'false'));
      b.setAttribute('aria-selected', 'true');
      renderProjects(c);
    });
    box.appendChild(b);
  });
  document.getElementById('project-more').addEventListener('click', () => {
    expanded = !expanded;
    renderProjects('全部');
  });
  renderProjects('全部');
}

function initNav() {
  const btn = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav');
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }));
}

function initForm() {
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(form);
    const subject = `【網站洽詢】${d.get('topic')}－${d.get('name')}`;
    const body = `姓名／單位：${d.get('name')}\n聯絡電話：${d.get('phone') || ''}\n洽詢項目：${d.get('topic')}\n\n${d.get('message')}`;
    location.href = `mailto:yoshi.hml@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

document.getElementById('year').textContent = new Date().getFullYear();
initFilters();
initNav();
initForm();
