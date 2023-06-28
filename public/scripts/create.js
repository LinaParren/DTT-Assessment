document.addEventListener('DOMContentLoaded', function () {

    // Event listener for 'submit' event on createForm
    document.getElementById('createForm').addEventListener('submit', function (event) {
        event.preventDefault();

        // Get data for the items from API
        const newHouse = {
            location: {
                street: document.getElementById('createstreet').value,
                houseNumber: parseInt(document.getElementById('createhousenumber').value),
                houseNumberAddition: document.getElementById('createhousenumberaddition').value,
                zip: document.getElementById('createzip').value,
                city: document.getElementById('createcity').value,
            },
            image: document.getElementById('createimage').files[0],
            price: document.getElementById('createprice').value,
            size: document.getElementById('createsize').value,
            hasGarage: document.getElementById('creategarage').value,
            rooms: {
                bedrooms: parseInt(document.getElementById('createbedrooms').value),
                bathrooms: parseInt(document.getElementById('createbathrooms').value),
            },
            constructionYear: document.getElementById('createconstructiondate').value,
            description: document.getElementById('createdescription').value,
        };

        // Call createListing function with newHouse object
        createListing(newHouse);
    });

    function createListing(newHouse) {
        // Set madeByMe automatically to true
        newHouse.madeByMe = true;

        var createHeaders = new Headers();
        createHeaders.append("X-Api-Key", "0D2payThq_sfnNlBtRod15V3ZMAckuQw");
        createHeaders.append("Content-Type", "application/json");

        var createOptions = {
            method: 'POST',
            headers: createHeaders,
            body: JSON.stringify(newHouse), // Convert the newHouse object to JSON string
            redirect: 'follow'
        };

        // Send POST request to specified URL with the createOptions
        fetch('https://api.intern.d-tt.nl/api/houses', createOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                // Optionally, redirect to the newly created listing page or perform any other actions
            })
            .catch(error => console.log('error', error));
    }
});