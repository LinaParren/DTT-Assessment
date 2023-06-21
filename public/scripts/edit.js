document.addEventListener('DOMContentLoaded', function () {

  const houseId = new URLSearchParams(window.location.search).get('houseId');
  populateFormWithHouseData(houseId);

  console.log(houseId);

  document.getElementById('editForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const houseId = new URLSearchParams(window.location.search).get('houseId');

    const updatedHouse = {
      price: document.getElementById('inputprice').value,
      size: document.getElementById('inputsize').value,
      hasGarage: document.getElementById('inputgarage').value,
      constructionYear: document.getElementById('inputconstructiondate').value.split('-')[0],
      description: document.getElementById('inputdescription').value,
      location: {
        street: document.getElementById('inputstreet').value,
        houseNumber: parseInt(document.getElementById('inputhousenumber').value),
        houseNumberAddition: document.getElementById('inputhousenumberaddition').value,
        city: document.getElementById('inputcity').value,
        zip: document.getElementById('inputzip').value
      },
      rooms: {
        bedrooms: parseInt(document.getElementById('inputbedrooms').value),
        bathrooms: parseInt(document.getElementById('inputbathrooms').value)
      },
      image: document.getElementById('inputimage').value // Add the image field
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
})

function populateFormWithHouseData(houseId) {
  var headers = new Headers();
  headers.append("X-Api-Key", "0D2payThq_sfnNlBtRod15V3ZMAckuQw");

  var options = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
  };

  fetch(`https://api.intern.d-tt.nl/api/houses/${houseId}`, options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const house = data[0];
      document.getElementById('inputstreet').value = house.location.street;
      document.getElementById('inputhousenumber').value = house.location.houseNumber;
      document.getElementById('inputhousenumberaddition').value = house.location.houseNumberAddition;
      document.getElementById('inputzip').value = house.location.zip;
      document.getElementById('inputcity').value = house.location.city;
      document.getElementById('inputimage').value = house.image;
      document.getElementById('inputprice').value = house.price;
      document.getElementById('inputsize').value = house.size;
      document.getElementById('inputgarage').value = house.hasGarage ? 'yes' : 'no'; // Set the selected option based on hasGarage value
      document.getElementById('inputbedrooms').value = house.rooms.bedrooms;
      document.getElementById('inputbathrooms').value = house.rooms.bathrooms;
      document.getElementById('inputconstructiondate').value = `${house.constructionYear}`;
      document.getElementById('inputdescription').value = house.description;
    })
    .catch(error => console.log('error', error));
}
