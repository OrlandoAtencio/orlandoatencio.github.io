    (function () {
      var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
      var panels = Array.prototype.slice.call(document.querySelectorAll('[role="tabpanel"]'));

      function activate(tab, focusTab) {
        tabs.forEach(function (t) {
          var selected = t === tab;
          t.setAttribute('aria-selected', selected ? 'true' : 'false');
          t.tabIndex = selected ? 0 : -1;
        });
        panels.forEach(function (p) {
          var active = p.id === tab.getAttribute('aria-controls');
          p.classList.toggle('active', active);
          p.hidden = !active;
        });
        if (focusTab) tab.focus();
      }

      tabs.forEach(function (tab, i) {
        tab.addEventListener('click', function () { activate(tab, false); });
        tab.addEventListener('keydown', function (e) {
          var idx = i;
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); idx = (i + 1) % tabs.length; activate(tabs[idx], true); }
          if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); idx = (i - 1 + tabs.length) % tabs.length; activate(tabs[idx], true); }
          if (e.key === 'Home') { e.preventDefault(); activate(tabs[0], true); }
          if (e.key === 'End') { e.preventDefault(); activate(tabs[tabs.length - 1], true); }
        });
      });
    })();
