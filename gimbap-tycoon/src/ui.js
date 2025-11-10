export function showPopup({ title, html, buttons }) {
  const pop = document.getElementById('popup');
  document.getElementById('popupTitle').textContent = title;
  document.getElementById('popupBody').innerHTML = html;
  const btns = document.getElementById('popupBtns');
  btns.innerHTML = '';
  (buttons || [{ label: '확인' }]).forEach((b) => {
    const el = document.createElement('button');
    el.textContent = b.label;
    el.onclick = () => {
      pop.style.display = 'none';
      b.onClick && b.onClick();
    };
    btns.appendChild(el);
  });
  pop.style.display = 'flex';
}
