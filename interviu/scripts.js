window.addEventListener('DOMContentLoaded', (event) => {
    const menu = document.getElementById('menu');
    const menuButton = document.getElementById('menu-button');

    menuButton.addEventListener('click', function(event) {
        menu.classList.toggle('open');
        menu.classList.toggle('closed');
    });

    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && menu.classList.contains('open')) {
            menu.classList.remove('open');
            menu.classList.add('closed');
        }
    });
});
