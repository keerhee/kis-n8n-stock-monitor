(function () {
  'use strict';

  const STORAGE_KEY = 'kis-n8n-progress';
  const TOTAL_MODULES = 7;

  function getProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function setProgress(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* localStorage unavailable */ }
  }

  function countDone(state) {
    return Object.keys(state).filter(k => state[k] === true).length;
  }

  function updateProgressBar() {
    const state = getProgress();
    const done = countDone(state);
    const pct = Math.round((done / TOTAL_MODULES) * 100);
    const fill = document.getElementById('progress-fill');
    const count = document.getElementById('progress-count');
    if (fill) fill.style.width = pct + '%';
    if (count) count.textContent = done;
  }

  function updateSidebar() {
    const state = getProgress();
    document.querySelectorAll('.sidebar-nav a[data-module]').forEach(link => {
      const num = link.dataset.module;
      if (state[num]) link.classList.add('done');
      else link.classList.remove('done');
    });
  }

  function updateModuleCards() {
    const state = getProgress();
    document.querySelectorAll('.module-card[data-module]').forEach(card => {
      const num = card.dataset.module;
      if (state[num]) card.classList.add('done');
      else card.classList.remove('done');
    });
  }

  function updateToggleButton() {
    const btn = document.getElementById('complete-toggle');
    if (!btn) return;
    const num = btn.dataset.module;
    const state = getProgress();
    const isDone = state[num] === true;
    const icon = btn.querySelector('.check-icon');
    const text = btn.querySelector('.toggle-text');
    if (isDone) {
      btn.classList.add('checked');
      if (icon) icon.textContent = '☑';
      if (text) text.textContent = '완료 표시 해제';
    } else {
      btn.classList.remove('checked');
      if (icon) icon.textContent = '☐';
      if (text) text.textContent = '이 모듈을 완료로 표시';
    }
  }

  function bindToggle() {
    const btn = document.getElementById('complete-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const num = btn.dataset.module;
      const state = getProgress();
      state[num] = !state[num];
      setProgress(state);
      updateToggleButton();
      updateProgressBar();
      updateSidebar();
    });
  }

  function init() {
    updateProgressBar();
    updateSidebar();
    updateModuleCards();
    updateToggleButton();
    bindToggle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
