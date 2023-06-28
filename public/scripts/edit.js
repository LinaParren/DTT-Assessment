document.addEventListener('DOMContentLoaded', function () {

  // Check houseId as correct data needs to be loaded when editing a listing
  const houseId = new URLSearchParams(window.location.search).get('houseId');
  populateFormWithHouseData(houseId);

  console.log(houseId);

  // Event listener for 'submit' event on editForm
  document.getElementById('editForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get data for the items from API
    const editHouse = {
      price: document.getElementById('editprice').value,
      size: document.getElementById('editsize').value,
      hasGarage: document.getElementById('editgarage').value,
      constructionYear: document.getElementById('editconstructiondate').value.split('-')[0],
      description: document.getElementById('editdescription').value,
      location: {
        street: document.getElementById('editstreet').value,
        houseNumber: parseInt(document.getElementById('edithousenumber').value),
        houseNumberAddition: document.getElementById('edithousenumberaddition').value,
        city: document.getElementById('editcity').value,
        zip: document.getElementById('editzip').value
      },
      rooms: {
        bedrooms: parseInt(document.getElementById('editbedrooms').value),
        bathrooms: parseInt(document.getElementById('editbathrooms').value)
      },
      image: document.getElementById('editimage').value
    };

    // Call saveEdit function with houseId and editHouse object
    saveEdit(houseId, editHouse);
  });

  function saveEdit(houseId, editHouse) {
    var saveHeaders = new Headers();
    saveHeaders.append("X-Api-Key", "0D2payThq_sfnNlBtRod15V3ZMAckuQw");
    saveHeaders.append("Content-Type", "application/json");

    var saveOptions = {
      method: 'PUT',
      headers: saveHeaders,
      body: JSON.stringify(editHouse),
      redirect: 'follow'
    };

    // Send PUT request to update specified houseId with editHouse data
    fetch(`https://api.intern.d-tt.nl/api/houses/${houseId}`, saveOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
      })
      .catch(error => console.log('error', error));
  }
})

// Function to populate editForm with data of specified houseId
function populateFormWithHouseData(houseId) {
  var formHeaders = new Headers();
  formHeaders.append("X-Api-Key", "0D2payThq_sfnNlBtRod15V3ZMAckuQw");

  var formOptions = {
    method: 'GET',
    headers: formHeaders,
    redirect: 'follow'
  };

  // Send GET request to retrieve data of specified houseId
  fetch(`https://api.intern.d-tt.nl/api/houses/${houseId}`, formOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const house = data[0];
      // Populate form fields with correct house data
      document.getElementById('editstreet').value = house.location.street;
      document.getElementById('edithousenumber').value = house.location.houseNumber;
      document.getElementById('edithousenumberaddition').value = house.location.houseNumberAddition;
      document.getElementById('editzip').value = house.location.zip;
      document.getElementById('editcity').value = house.location.city;
      document.getElementById('editimage').value = house.image;
      document.getElementById('editprice').value = house.price;
      document.getElementById('editsize').value = house.size;
      document.getElementById('editgarage').value = house.hasGarage ? 'yes' : 'no'; // Convert boolean value to 'yes' or 'no'
      document.getElementById('editbedrooms').value = house.rooms.bedrooms;
      document.getElementById('editbathrooms').value = house.rooms.bathrooms;
      document.getElementById('editconstructiondate').value = `${house.constructionYear}`; // Convert to string
      document.getElementById('editdescription').value = house.description;
    })
    .catch(error => console.log('error', error));
}
