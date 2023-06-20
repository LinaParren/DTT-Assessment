document.getElementById('editForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const houseId = new URLSearchParams(window.location.search).get('houseId');
    
    const updatedHouse = {
        street: document.getElementById('street').value,
        houseNumber: document.getElementById('housenumber').value,
        houseNumberAddition: document.getElementById('housenumberaddition').value,
        zip: document.getElementById('zip').value,
        city: document.getElementById('city').value,
        // image: document.getElementById('street').value,
        price: document.getElementById('price').value,
        size: document.getElementById('size').value,
        // hasGarage: document.getElementById('garage').value,
        bedrooms: document.getElementById('bedrooms').value,
        bathrooms: document.getElementById('bathrooms').value,
        constructionYear: document.getElementById('constructiondate').value,
        description: document.getElementById('description').value
    };
    
    saveChanges(houseId, updatedHouse);
});

function saveChanges(houseId, data) {
    var saveHeaders = new Headers();
    saveHeaders.append("X-Api-Key", "0D2payThq_sfnNlBtRod15V3ZMAckuQw");
    saveHeaders.append("Content-Type", "application/json");

    var saveOptions = {
        method: 'PUT',
        headers: saveHeaders,
        body: JSON.stringify(data), 
        redirect: 'follow'
    };

    fetch(`https://api.intern.d-tt.nl/api/houses/${houseId}`, saveOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
        })
        .catch(error => console.log('error', error));
}
