// Create headers and options for GET request to retrieve data
var mainHeaders = new Headers();
mainHeaders.append("X-Api-Key", "0D2payThq_sfnNlBtRod15V3ZMAckuQw");

var mainOptions = {
  method: 'GET',
  headers: mainHeaders,
  redirect: 'follow'
};

// Get reference to div that will contain the house listings
const housesList = document.getElementById('overview');

// Send initial GET request to retrieve data from API
fetch("https://api.intern.d-tt.nl/api/houses", mainOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)

    // Clear existing content of house listings element
    housesList.innerHTML = ''; 

    // Iterate through each house item in result
    result.forEach(item => {
      const {
        id,
        image,
        location,
        price,
        rooms,
        size,
        madeByMe
      } = item;

      const {
        city,
        houseNumber,
        houseNumberAddition,
        street,
        zip
      } = location;

      const {
        bathrooms,
        bedrooms,
      } = rooms;

      // Create elements to represent house items in the list
      const listItem = document.createElement('li');
      listItem.classList.add('house-item');

      const houseImage = document.createElement('div');
      houseImage.classList.add('house-image');
      houseImage.innerHTML = `
        <img src="${image}" alt="Image of the house">
      `;

      const houseInfo = document.createElement('div');
      houseInfo.classList.add('house-info');

      const houseModify = document.createElement('div');
      houseModify.classList.add('house-modify');

      const streetHouse = document.createElement('div');
      streetHouse.classList.add('house-streetname');
      streetHouse.innerHTML = `
        ${street}
        ${houseNumber}
        ${houseNumberAddition}
      `;

      const priceHouse = document.createElement('div');
      priceHouse.classList.add('house-price');
      priceHouse.innerHTML = `&euro; ${price.toLocaleString('nl-NL')}`;

      const addressHouse = document.createElement('div');
      addressHouse.classList.add('house-address');
      addressHouse.innerHTML = `
        ${zip}
        ${city}
      `;

      const detailsHouse = document.createElement('div');
      detailsHouse.classList.add('house-details');
      detailsHouse.innerHTML = `
        <img src="../images/ic_bed@3x.png" alt="bedrooms">
        ${bedrooms}
        <img src="../images/ic_bath@3x.png" alt="bedrooms">
        ${bathrooms}
        <img src="../images/ic_size@3x.png" alt="bedrooms">
        ${size} m&sup2;
      `;

      // Check if house is created by the current user (madeByMe)
      if (madeByMe == true) {
        // Create edit and delete buttons for user's own listings
        const houseEdit = document.createElement('a');
        houseEdit.classList.add('house-edit');
        houseEdit.innerHTML = `
            <img src="../images/ic_edit@3x.png" alt="Edit house">
        `;
        houseEdit.addEventListener('click', (event) => {
          event.stopPropagation(); 
          window.location.href = `edit.html?houseId=${id}`;
        });

        const houseDelete = document.createElement('a');
        houseDelete.classList.add('house-delete');
        houseDelete.innerHTML = `
            <img src="../images/ic_delete@3x.png" alt="Delete house">
        `;

        houseModify.appendChild(houseEdit);
        houseModify.appendChild(houseDelete);
    }

    // Add event listener to navigate to the house details page when clicked
      listItem.addEventListener('click', () => {
        window.location.href = `house.html?houseId=${id}`;
      });

      houseInfo.appendChild(streetHouse);
      houseInfo.appendChild(priceHouse);
      houseInfo.appendChild(addressHouse);
      houseInfo.appendChild(detailsHouse);
      listItem.appendChild(houseImage);
      listItem.appendChild(houseInfo);
      listItem.appendChild(houseModify);
      housesList.appendChild(listItem);
    });

    // Attach event listeners for search input
    const searchInput = document.getElementById('searchbar');
    searchInput.addEventListener('input', searchHandler);
    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault(); 
        searchHandler();
      }
    });

    // Function to handle search input and filter the displayed results
    function searchHandler() {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredData = result.filter(item => {
        return (
          item.location.street.toLowerCase().includes(searchTerm) ||
          item.location.city.toLowerCase().includes(searchTerm) ||
          item.location.zip.toString().includes(searchTerm) ||
          item.price.toString().includes(searchTerm) ||
          item.size.toString().includes(searchTerm)
        );
      });

      displayResults(filteredData);
    }

    // Function to display filtered results in the house listings
    function displayResults(results) {
      housesList.innerHTML = '';

      // Check if there are possibly no search results
      if (results.length === 0) {
        const noResults = document.createElement('div');
        noResults.classList.add('no_results');
        noResults.innerHTML = `
        <img src="../images/img_empty_houses@3x.png" alt="No results">
        No results found. Please try another keyword.
        `;
        housesList.appendChild(noResults);
      } 
      // If there are results, process this code
      else {
        results.forEach(item => {
          const {
            id,
            image,
            location,
            price,
            rooms,
            size,
            madeByMe
          } = item;

          const {
            city,
            houseNumber,
            houseNumberAddition,
            street,
            zip
          } = location;

          const {
            bathrooms,
            bedrooms,
          } = rooms;

          const listItem = document.createElement('li');
          listItem.classList.add('house-item');

          const houseImage = document.createElement('div');
          houseImage.classList.add('house-image');
          houseImage.innerHTML = `
            <img src="${image}" alt="Image of the house">
          `;

          const houseInfo = document.createElement('div');
          houseInfo.classList.add('house-info');

          const houseModify = document.createElement('div');
          houseModify.classList.add('house-modify');

          const streetName = document.createElement('div');
          streetName.classList.add('house-streetname');
          streetName.innerHTML = `
            ${street}
            ${houseNumber}
            ${houseNumberAddition}
          `;

          const priceHouse = document.createElement('div');
          priceHouse.classList.add('house-price');
          priceHouse.innerHTML = `&euro; ${price.toLocaleString('nl-NL')}`;

          const addressHouse = document.createElement('div');
          addressHouse.classList.add('house-address');
          addressHouse.innerHTML = `
            ${zip}
            ${city}
          `;

          const detailsHouse = document.createElement('div');
          detailsHouse.classList.add('house-details');
          detailsHouse.innerHTML = `
            <img src="../images/ic_bed@3x.png" alt="bedrooms">
            ${bedrooms}
            <img src="../images/ic_bath@3x.png" alt="bedrooms">
            ${bathrooms}
            <img src="../images/ic_size@3x.png" alt="bedrooms">
            ${size} m&sup2;
          `;

          // Check if house is created by the current user (madeByMe)
          if (madeByMe == true) {
            // Create edit and delete buttons for user's own listings
            const houseEdit = document.createElement('a');
            houseEdit.classList.add('house-edit');
            houseEdit.innerHTML = `
              <img src="../images/ic_edit@3x.png" alt="Edit house">
            `;
            houseEdit.addEventListener('click', () => {
              window.location.href = `edit.html?houseId=${id}`;
            });

            // Add an event listener to navigate to the house details page when clicked
            const houseDelete = document.createElement('a');
            houseDelete.classList.add('house-delete');
            houseDelete.innerHTML = `
              <img src="../images/ic_delete@3x.png" alt="Delete house">
            `;

            houseModify.appendChild(houseEdit);
            houseModify.appendChild(houseDelete);
          }

          listItem.addEventListener('click', () => {
            window.location.href = `house.html?houseId=${id}`;
          });

          houseInfo.appendChild(streetName);
          houseInfo.appendChild(priceHouse);
          houseInfo.appendChild(addressHouse);
          houseInfo.appendChild(detailsHouse);
          listItem.appendChild(houseImage);
          listItem.appendChild(houseInfo);
          listItem.appendChild(houseModify);

          housesList.appendChild(listItem);
        });
      }
    }
  })
  .catch(error => console.log('error', error));
