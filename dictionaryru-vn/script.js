function toggleMenu() {
    const bottomMenu = document.getElementById('bottom-menu');
    if (bottomMenu.style.display === 'block') {
        bottomMenu.style.display = 'none';
    } else {
        bottomMenu.style.display = 'block';
    }
}
