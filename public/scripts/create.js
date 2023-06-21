document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('createForm').addEventListener('submit', function (event) {
        event.preventDefault();

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

        createListing(newHouse);
    });

    function createListing(newHouse) {
        newHouse.madeByMe = true; // Set the madeByMe property to true

        var saveHeaders = new Headers();
        saveHeaders.append("X-Api-Key", "0D2payThq_sfnNlBtRod15V3ZMAckuQw");
        saveHeaders.append("Content-Type", "application/json");

        var saveOptions = {
            method: 'POST',
            headers: saveHeaders,
            body: JSON.stringify(newHouse),
            redirect: 'follow'
        };

        fetch('https://api.intern.d-tt.nl/api/houses', saveOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                // Optionally, redirect to the newly created listing page or perform any other actions
            })
            .catch(error => console.log('error', error));
    }
});