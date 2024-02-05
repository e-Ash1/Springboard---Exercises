
document.addEventListener('DOMContentLoaded', () => {
    fetch('/items')
        .then(response => response.json())
        .then(data => {
            const itemsList = document.getElementById('items-list');
            data.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name}: $\${item.price}`;
                itemsList.appendChild(li);
            });
        });
});
