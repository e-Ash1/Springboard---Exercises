$(document).ready(function() {
    // When the document is ready:

    async function getCupcakes() {
        // Send a GET request to '/api/cupcakes' using axios.
        const response = await axios.get('/api/cupcakes');

        // Wait for the response.

        // For each cupcake in the response data:
        response.data.cupcakes.forEach(cupcake => {
            // Append a list item to the '#cupcakes-list' element with:
            $('#cupcakes-list').append(
                `<li>
                    <b>Flavor:</b> ${cupcake.flavor},
                    <b>Size:</b> ${cupcake.size},
                    <b>Rating:</b> ${cupcake.rating},
                    <img src="${cupcake.image}" alt="${cupcake.flavor} cupcake" width="100px">
                </li>`
            );
        });
    }
 

    // Call getCupcakes() to fetch and display cupcakes on page load.
    getCupcakes();

    // Add an event listener to the '#new-cupcake-form' element for form submission:
    $('#new-cupcake-form').on('submit', async function(event) {
        // Prevent the default form submission behavior.
        event.preventDefault();

        // Get the values of 'flavor', 'size', 'rating', and 'image' from the form input fields.
        let flavor = $('#flavor').val();
        let size = $('#size').val();
        let rating = $('#rating').val();
        let image = $('#image').val() || 'default-image-url';

        // Create an object 'newCupcakeData' with the retrieved values.
        const newCupcakeData = { flavor, size, rating, image };

        // Send a POST request to '/api/cupcakes' with 'newCupcakeData' using axios.
        const response = await axios.post('/api/cupcakes', newCupcakeData);

        // Wait for the response.

        // Append a list item to the '#cupcakes-list' element with:
        $('#cupcakes-list').append(
            `<li>
                <b>Flavor:</b> ${response.data.cupcake.flavor},
                <b>Size:</b> ${response.data.cupcake.size},
                <b>Rating:</b> ${response.data.cupcake.rating},
                <img src="${response.data.cupcake.image}" alt="${response.data.cupcake.flavor} cupcake" width="100px">
            </li>`
        );

        // Reset the form fields of '#new-cupcake-form'.
        $('#new-cupcake-form').trigger("reset");
    });
});

