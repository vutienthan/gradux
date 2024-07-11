document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const suggestionsBox = document.getElementById('suggestions');
    const resultBox = document.getElementById('result');
    let dictionary = {};

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
            if (dictionary[query]) {
                displayResult(query, dictionary[query]);
            } else {
                displayResult(query, 'No results found');
            }
        });
    });

    function fetchSuggestions(query) {
        const filteredSuggestions = Object.keys(dictionary).filter(item => 
            item.toLowerCase().includes(query.toLowerCase())
        );

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
                    displayResult(item, dictionary[item]);
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
