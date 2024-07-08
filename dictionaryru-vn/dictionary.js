document.addEventListener('DOMContentLoaded', () => {
    fetch('dictionary.json')
        .then(response => response.json())
        .then(dictionary => {
            const wordList = document.getElementById('word-list');
            dictionary.forEach((item, index) => {
                const wordItem = document.createElement('li');
                wordItem.className = 'word-item';
                const container = document.createElement('div');
                container.className = 'word-item-container';
                container.innerHTML = `<b>${index + 1}. RU:</b> ${item.ru} <br> <b>VI:</b> ${item.vi}`;
                wordItem.appendChild(container);
                wordList.appendChild(wordItem);
            });
        })
        .catch(error => console.error('Error fetching dictionary:', error));
});
