document.addEventListener('DOMContentLoaded', () => {
    fetch('dictionary.json')
        .then(response => response.json())
        .then(dictionary => {
            const wordList = document.getElementById('word-list');
            dictionary.forEach(item => {
                const wordItem = document.createElement('li');
                wordItem.className = 'word-item';
                wordItem.innerHTML = `${item.en} <b>-</b> ${item.ru}`;
                wordList.appendChild(wordItem);
            });
        })
        .catch(error => console.error('Error fetching dictionary:', error));
});