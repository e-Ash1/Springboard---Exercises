const fruits = ["Apple", "Banana", "Grape", "Orange", "Pineapple", "Strawberry", "Blueberry", "Raspberry"]; 

const searchBar = document.getElementById('searchBar');
const suggestions = document.getElementById('suggestions');
searchBar.addEventListener('input', search);

function displayResults(results) {
    if (results.length === 0) {
        suggestions.classList.add('hidden');
        searchBar.setAttribute('aria-expanded', 'false');
        return;
    }

    suggestions.innerHTML = results.map(r => `<div class="suggestion" role="option">${r}</div>`).join('');
    suggestions.classList.remove('hidden');
    searchBar.setAttribute('aria-expanded', 'true');
}

function search() {
    const input = searchBar.value.toLowerCase();
    const results = fruits.filter(fruit => fruit.toLowerCase().includes(input));
    displayResults(results);
}

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('suggestion')) {
        searchBar.value = e.target.innerText;
        suggestions.classList.add('hidden');
        searchBar.setAttribute('aria-expanded', 'false');
    }
});

// Function to show/hide suggestions based on input
function showSuggestions() {
    var searchBar = document.getElementById('searchBar');
    var suggestions = document.getElementById('suggestions');
  
    // Check if the input value is empty or contains only spaces
    if (searchBar.value.trim() === '') {
      suggestions.classList.add('hidden');
    } else {
      suggestions.classList.remove('hidden');
    }
  }
  
  // Attach the showSuggestions function to the input's oninput event
  document.getElementById('searchBar').addEventListener('input', showSuggestions);
  
