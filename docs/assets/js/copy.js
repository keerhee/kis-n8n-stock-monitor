(function () {
  'use strict';

  function addCopyButtons() {
    document.querySelectorAll('pre').forEach(pre => {
      if (pre.querySelector('.code-copy-btn')) return;
      const btn = document.createElement('button');
      btn.className = 'code-copy-btn';
      btn.type = 'button';
      btn.textContent = '복사';
      btn.addEventListener('click', () => {
        const code = pre.querySelector('code') || pre;
        const text = code.innerText;
        const done = () => {
          btn.textContent = '복사됨!';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.textContent = '복사';
            btn.classList.remove('copied');
          }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, () => fallback(text, done));
        } else {
          fallback(text, done);
        }
      });
      pre.appendChild(btn);
    });
  }

  function fallback(text, done) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { /* noop */ }
    document.body.removeChild(ta);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addCopyButtons);
  } else {
    addCopyButtons();
  }
})();
