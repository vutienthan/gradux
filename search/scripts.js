document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const suggestionsBox = document.getElementById('suggestions');
    const resultBox = document.getElementById('result');
    let dictionary = [];

    // URL raw của file JSON trên GitHub
    const jsonUrl = 'https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPOSITORY/main/timkiem.json'; // Thay thế bằng URL raw của file JSON của bạn

    // Hàm để tải JSON từ GitHub
    function loadJSON(callback) {
        fetch(jsonUrl)
            .then(response => response.json())
            .then(data => {
                dictionary = data;
                callback();
            })
            .catch(error => {
                console.error('Error loading JSON:', error);
            });
    }

    // Gọi hàm loadJSON để tải JSON từ GitHub
    loadJSON(() => {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.trim();

            if (query.length > 0) {
                fetchSuggestions(query);
            } else {
                suggestionsBox.style.display = 'none';
            }
        });

        document.getElementById('search-form').addEventListener('submit', event => {
            event.preventDefault();
            const query = searchInput.value.trim();
            let result = dictionary.find(item => item.en.toLowerCase() === query.toLowerCase());

            if (!result) {
                result = dictionary.find(item => item.ru.some(ruItem => ruItem.toLowerCase() === query.toLowerCase()));
                if (result) {
                    displayResult(query, result.en);
                } else {
                    displayResult(query, 'No results found');
                }
            } else {
                displayResult(result.en, result.ru.join(', '));
            }
        });
    });

    function fetchSuggestions(query) {
        const filteredSuggestions = dictionary
            .filter(item => item.en.toLowerCase().includes(query.toLowerCase()) || item.ru.some(ruItem => ruItem.toLowerCase().includes(query.toLowerCase())))
            .map(item => item.en);

        displaySuggestions(filteredSuggestions);
    }

    function displaySuggestions(suggestions) {
        suggestionsBox.innerHTML = '';
        if (suggestions.length > 0) {
            suggestionsBox.style.display = 'block';
            suggestions.forEach(item => {
                const suggestionItem = document.createElement('div');
                suggestionItem.textContent = item;
                suggestionItem.classList.add('suggestion-item');
                suggestionItem.addEventListener('click', () => {
                    searchInput.value = item;
                    suggestionsBox.style.display = 'none';
                    const result = dictionary.find(dictItem => dictItem.en.toLowerCase() === item.toLowerCase());
                    displayResult(result.en, result.ru.join(', '));
                });
                suggestionsBox.appendChild(suggestionItem);
            });
        } else {
            suggestionsBox.style.display = 'none';
        }
    }

    function displayResult(query, result) {
        resultBox.style.display = 'block';
        resultBox.innerHTML = `<strong>${query}:</strong> ${result}`;
    }
});
