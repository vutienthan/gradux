window.addEventListener('DOMContentLoaded', (event) => {
    const menu = document.getElementById('menu');

    document.addEventListener('click', function(event) {
        if (event.target.closest('#menu')) return;
        menu.classList.remove('open');
    });

    menu.addEventListener('click', function(event) {
        menu.classList.toggle('open');
    });
});
