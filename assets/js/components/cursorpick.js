const cursor = document.querySelector('.cursor');
const containerBridge = document.querySelector('.containerBridge');

containerBridge.addEventListener('mouseenter', () => {
    cursor.style.display = 'block';
  
});

containerBridge.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
});

containerBridge.addEventListener('mousemove', (ev) => {
    cursor.style.left = ev.pageX + 'px';
    cursor.style.top = ev.pageY + 'px';

});

