const recordList = document.getElementById('recordList'),
  asdSub = document.getElementById('asdSubMenu');
let currentAsdItem = null;

recordList.addEventListener('click', function (e) {
  if (e.target.classList.contains('asd-menu-icon')) {
    const btn = e.target;
    const item = btn.closest('.asd_item');
    currentAsdItem = item;

    const rect = btn.getBoundingClientRect();
    const scrollTop = window.scrollY;
    const scrollLeft = window.scrollX;

    const offsetX = 18;
    const offsetY = 0;

    asdSub.style.top = rect.top + scrollTop + offsetY + 'px';
    asdSub.style.left = rect.left + scrollLeft + offsetX + 'px';
    asdSub.classList.remove('hidden');
  }
});

document.addEventListener('click', function (e) {
  if (
    !asdSub.contains(e.target) &&
    !e.target.classList.contains('asd-menu-icon')
  ) {
    asdSub.classList.add('hidden');
  }
});
