(function () {
  'use strict';

  function injectCalculator() {
    const target = document.querySelector('main .content-inner');
    if (!target) return;
    if (document.getElementById('volume-calc')) return;

    const html = `
      <div class="volume-calc" id="volume-calc">
        <h4 style="margin-top:0;">🧮 거래량 비율 계산기 — 직접 시뮬레이션</h4>
        <p style="margin: 4px 0 16px; font-size: 13px; color: var(--text-soft);">
          현재 거래량과 평균 거래량을 입력하면 비율과 분기 결과를 즉시 확인할 수 있습니다.
        </p>
        <div class="volume-calc-inputs">
          <div>
            <label for="vc-cur">현재 거래량 (cur_vol)</label>
            <input type="number" id="vc-cur" placeholder="예: 25000000" min="0" step="1">
          </div>
          <div>
            <label for="vc-avg">평균 거래량 (avg_vol, 20일)</label>
            <input type="number" id="vc-avg" placeholder="예: 10000000" min="0" step="1">
          </div>
        </div>
        <div class="volume-calc-result" id="vc-result">
          두 값을 입력하면 ratio와 분기 결과가 여기에 표시됩니다.
        </div>
        <p style="font-size: 11px; color: var(--text-muted); margin: 8px 0 0;">
          💡 임계값 기본값: 1.5배 이상 → 주의, 2.0배 이상 → 알림 발송, 5.0배 이상 → 급변동 의심
        </p>
      </div>
    `;

    // 첫 번째 H2 앞에 삽입
    const firstH2 = target.querySelector('h2');
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    if (firstH2) {
      firstH2.parentNode.insertBefore(wrap.firstElementChild, firstH2);
    } else {
      target.appendChild(wrap.firstElementChild);
    }

    bindCalculator();
  }

  function bindCalculator() {
    const cur = document.getElementById('vc-cur');
    const avg = document.getElementById('vc-avg');
    const result = document.getElementById('vc-result');
    if (!cur || !avg || !result) return;

    function update() {
      const c = parseFloat(cur.value);
      const a = parseFloat(avg.value);
      if (!c || !a || a <= 0) {
        result.className = 'volume-calc-result';
        result.innerHTML = '두 값을 입력하면 ratio와 분기 결과가 여기에 표시됩니다.';
        return;
      }
      const ratio = c / a;
      const ratioStr = ratio.toFixed(2);

      let level, className, message, action;
      if (ratio >= 5.0) {
        level = '🚨 급변동 의심';
        className = 'alert';
        message = '평균 대비 5배 이상 — 강한 시장 신호입니다.';
        action = 'IF 노드 → TRUE → 디스코드 즉시 알림 + 시트 기록';
      } else if (ratio >= 2.0) {
        level = '🔔 알림 발송';
        className = 'alert';
        message = '평균 대비 2배 이상 — 모니터링 필요.';
        action = 'IF 노드 → TRUE → 디스코드 알림 + 시트 기록';
      } else if (ratio >= 1.5) {
        level = '⚠️ 주의 수준';
        className = '';
        message = '평소보다 거래량이 늘어났지만 알림 임계값 미만.';
        action = 'IF 노드 → FALSE → 시트만 기록 (조용히)';
      } else {
        level = '✓ 정상 거래';
        className = 'normal';
        message = '평소 수준의 거래량입니다.';
        action = 'IF 노드 → FALSE → 시트만 기록 (조용히)';
      }

      result.className = 'volume-calc-result ' + className;
      result.innerHTML = `
        <div style="display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap;">
          <div>
            <div style="font-size:12px; color:var(--text-soft); font-weight:600;">RATIO</div>
            <div class="volume-calc-ratio">${ratioStr}<span style="font-size:14px; color:var(--text-soft); margin-left:4px;">배</span></div>
          </div>
          <div style="text-align:right;">
            <div style="font-weight:700; font-size:15px;">${level}</div>
            <div style="font-size:12px; color:var(--text-soft);">${message}</div>
          </div>
        </div>
        <div style="margin-top:12px; padding-top:12px; border-top:1px dashed var(--border-strong); font-size:13px;">
          <strong>👉 워크플로 동작:</strong> ${action}
        </div>
      `;
    }

    cur.addEventListener('input', update);
    avg.addEventListener('input', update);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectCalculator);
  } else {
    injectCalculator();
  }
})();
