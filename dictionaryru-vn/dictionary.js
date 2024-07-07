document.addEventListener('DOMContentLoaded', () => {
    fetch('dictionary.json')
        .then(response => response.json())
        .then(dictionary => {
            const wordList = document.getElementById('word-list');
            dictionary.forEach(item => {
                const wordItem = document.createElement('div');
                wordItem.className = 'word-item';
                wordItem.textContent = item['ru-vi'];
                wordList.appendChild(wordItem);
            });
        })
        .catch(error => console.error('Error fetching dictionary:', error));
});
