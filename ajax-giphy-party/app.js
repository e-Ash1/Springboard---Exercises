document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('gif-form');
    const gifContainer = document.getElementById('gif-container');
    const removeGifsButton = document.getElementById('remove-gifs');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const searchTerm = document.getElementById('search-term').value;
        const apiKey = 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym';
        const url = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}&limit=1`;

        try {
            const response = await axios.get(url);
            const gifUrl = response.data.data[0].images.original.url;
            const img = document.createElement('img');
            img.src = gifUrl;
            gifContainer.appendChild(img);
        } catch (error) {
            console.error('Error fetching the GIF', error);
        }
    });

    removeGifsButton.addEventListener('click', function () {
        while (gifContainer.firstChild) {
            gifContainer.removeChild(gifContainer.firstChild);
        }
    });
});
