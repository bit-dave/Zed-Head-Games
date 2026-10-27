// Screenshot lightbox. Works with mouse, touch (swipe) and keyboard (arrows, Esc).
(function () {
  var dlg = document.getElementById('lightbox');
  if (!dlg || typeof dlg.showModal !== 'function') return; // very old browsers: thumbnails still show
  var btns = Array.prototype.slice.call(document.querySelectorAll('.gallery button'));
  var img = document.getElementById('lb-img'), cap = document.getElementById('lb-cap'), i = 0, opener = null;
  function show(n) {
    i = (n + btns.length) % btns.length;
    img.src = btns[i].dataset.full; img.alt = 'Screenshot: ' + btns[i].dataset.cap; cap.textContent = btns[i].dataset.cap + '  (' + (i + 1) + ' / ' + btns.length + ')';
  }
  btns.forEach(function (b, n) { b.addEventListener('click', function () { opener = b; show(n); dlg.showModal(); }); });
  dlg.querySelector('.lb-close').addEventListener('click', function () { dlg.close(); });
  dlg.querySelector('.lb-prev').addEventListener('click', function () { show(i - 1); });
  dlg.querySelector('.lb-next').addEventListener('click', function () { show(i + 1); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target.classList.contains('lb-inner')) dlg.close(); });
  dlg.addEventListener('close', function () { img.removeAttribute('src'); if (opener) opener.focus(); });
  document.addEventListener('keydown', function (e) {
    if (!dlg.open) return;
    if (e.key === 'ArrowLeft') show(i - 1); else if (e.key === 'ArrowRight') show(i + 1);
  });
  var x0 = null;
  dlg.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  dlg.addEventListener('touchend', function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) show(i + (dx < 0 ? 1 : -1)); x0 = null; });
})();
