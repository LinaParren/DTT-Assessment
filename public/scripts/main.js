var myHeaders = new Headers();
myHeaders.append("X-Api-Key", "0D2payThq_sfnNlBtRod15V3ZMAckuQw");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

const housesList = document.getElementById('overview');

fetch("https://api.intern.d-tt.nl/api/houses", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    housesList.innerHTML = ''; // Clear the existing content of the list

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

      if (madeByMe == true) {
        const houseEdit = document.createElement('a');
        houseEdit.classList.add('house-edit');
        houseEdit.innerHTML = `
            <img src="../images/ic_edit@3x.png" alt="Edit house">
        `;
        // houseEdit.addEventListener('click', () => {
        //     window.location.href = `edit.html?houseId=${id}`;
        // });
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


    // Search functionality
    const searchInput = document.getElementById('searchbar');
    searchInput.addEventListener('input', searchHandler);
    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        searchHandler();
      }
    });

    function searchHandler() {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredData = result.filter(item => {
        return (
        //   item.description.toLowerCase().includes(searchTerm) ||
          item.location.street.toLowerCase().includes(searchTerm) ||
          item.location.city.toLowerCase().includes(searchTerm) ||
          item.location.zip.toString().includes(searchTerm) ||
          item.price.toString().includes(searchTerm) ||
          item.size.toString().includes(searchTerm)
        );
      });

      displayResults(filteredData);
    }

    function displayResults(results) {
      housesList.innerHTML = '';


      if (results.length === 0) {
        const noResults = document.createElement('div');
        noResults.classList.add('no_results');
        noResults.innerHTML = `
        <img src="../images/img_empty_houses@3x.png" alt="No results">
        No results found. Please try another keyword.
        `;
        housesList.appendChild(noResults);
      } else {
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

          if (madeByMe == true) {
            const houseEdit = document.createElement('a');
            houseEdit.classList.add('house-edit');
            houseEdit.innerHTML = `
              <img src="../images/ic_edit@3x.png" alt="Edit house">
            `;
            houseEdit.addEventListener('click', () => {
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



// -----------------------------------------------------


// Fetch the API data
// fetch("https://api.intern.d-tt.nl/api/houses")
//     .then(response => response.json())
//     .then(data => {
//         const searchInput = document.getElementById('searchbar');
//         const resultsList = document.getElementById('results');

//         // Function to filter the data based on search input
//         const searchHandler = () => {
//             const searchTerm = searchInput.value.toLowerCase();
//             const filteredData = data.filter(item => {
//                 // Modify the conditions based on your desired search criteria
//                 return (
//                     item.description.toLowerCase().includes(searchTerm) ||
//                     item.location.city.toLowerCase().includes(searchTerm)
//                 );
//             });

//             // Display the filtered results
//             displayResults(filteredData);
//         };

//         // Function to display the search results
//         const displayResults = (results) => {
//             resultsList.innerHTML = '';

//             if (results.length === 0) {
//                 const noResults = document.createElement('li');
//                 noResults.textContent = 'No results found.';
//                 resultsList.appendChild(noResults);
//             } else {
//                 results.forEach(result => {
//                     const listItem = document.createElement('li');
//                     listItem.textContent = result.description;
//                     resultsList.appendChild(listItem);
//                 });
//             }
//         };

//         // Add event listener to trigger search on input change
//         searchInput.addEventListener('input', searchHandler);
//         searchInput.addEventListener('keydown', (event) => {
//             if (event.key === 'Enter') {
//                 event.preventDefault(); // Prevent form submission
//                 searchHandler();
//             }
//         });
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });





// function editHouse(houseId) {
//     var editHeaders = new Headers();
//     editHeaders.append("X-Api-Key", "0D2payThq_sfnNlBtRod15V3ZMAckuQw");
//     editHeaders.append("Content-Type", "application/json");

//     var editOptions = {
//         method: 'GET',
//         headers: editHeaders,
//         redirect: 'follow'
//     };

//     fetch("https://api.intern.d-tt.nl/api/houses/${houseId}", editOptions)
//         .then(response => response.json())
//         .then(result => {
//             console.log(result)
//             const editList = document.getElementById('testje');
//             editList.innerHTML = '';

//             result.forEach(item => {
//                 const {
//                     id,
//                     image,
//                     city,
//                     houseNumber,
//                     houseNumberAddition,
//                     street,
//                     zip,
//                     price,
//                     bathrooms,
//                     bedrooms,
//                     size
//                 } = item;

//                 // const editButton = document.createElement('button');
//                 // editButton.textContent = 'Edit';
//                 // editButton.addEventListener('click', () => {
//                 //     window.location.href = `edit.html?houseId=${houseId}`;
//                 // });

//                 const saveButton = document.createElement('button');
//                 saveButton.textContent = 'Save';
//                 saveButton.addEventListener('click', () => {
//                     saveChanges(houseId, result); // Call the saveChanges function with the house ID and data
//                 });

//                 const lijst = document.createElement('li');
//                 lijst.classList.add('li-test');

//                 const editItem = document.createElement('li');
//                 editItem.classList.add('edit-item');
//                 editItem.innerHTML = `
//                       id: ${id}, 
//                       image: ${image}, 
//                       city: ${city}, 
//                       houseNumber: ${houseNumber}, 
//                       houseNumberAddition: ${houseNumberAddition}, 
//                       street: ${street}, 
//                       zip: ${zip}, 
//                       price: ${price}, 
//                       bathrooms: ${bathrooms}, 
//                       bedrooms: ${bedrooms}, 
//                       size: ${size}`;

//                 lijst.appendChild(editItem);
//                 editList.appendChild(lijst);
//             });
//         })
//         .catch(error => console.log('error', error));
// }

// function saveChanges(houseId, data) {
//     var saveHeaders = new Headers();
//     saveHeaders.append("X-Api-Key", "0D2payThq_sfnNlBtRod15V3ZMAckuQw");
//     saveHeaders.append("Content-Type", "application/json");

//     var saveOptions = {
//         method: 'PUT', // Change the method to PUT to update the house
//         headers: saveHeaders,
//         body: JSON.stringify(data), // Pass the updated data as JSON string
//         redirect: 'follow'
//     };

//     fetch(`https://api.intern.d-tt.nl/api/houses/${houseId}`, saveOptions)
//         .then(response => response.json())
//         .then(result => {
//             console.log(result);
//             // Handle the success response as needed
//         })
//         .catch(error => console.log('error', error));
// }


// var test = new Headers();
// test.append("X-Api-Key", "0D2payThq_sfnNlBtRod15V3ZMAckuQw");

// var editOptions = {
//     method: 'POST',
//     headers: test,
//     // body: formdata,
//     redirect: 'follow'
// };

// fetch("https://api.intern.d-tt.nl/api/houses/:houseId", editOptions)
//     .then(response => response.json())
//     .then(result => {
//         console.log(result)
//         const editList = document.getElementById('testje');
//         editList.innerHTML = '';

//         result.forEach(item => {
//             const {
//                 id,
//                 image,
//                 city,
//                 houseNumber,
//                 houseNumberAddition,
//                 street,
//                 zip,
//                 price,
//                 bathrooms,
//                 bedrooms,
//                 size
//             } = item;

//             const lijst = document.createElement('li');
//             lijst.classList.add('li-test');

//             const editItem = document.createElement('li');
//             editItem.classList.add('edit-item');
//             editItem.innerHTML = `
//                       id: ${id}, 
//                       image: ${image}, 
//                       city: ${city}, 
//                       houseNumber: ${houseNumber}, 
//                       houseNumberAddition: ${houseNumberAddition}, 
//                       street: ${street}, 
//                       zip: ${zip}, 
//                       price: ${price}, 
//                       bathrooms: ${bathrooms}, 
//                       bedrooms: ${bedrooms}, 
//                       size: ${size}`;

//             lijst.appendChild(editItem);
//             editList.appendChild(lijst);
//         });
//     })
//     .catch(error => console.log('error', error));


// fetch("https://api.intern.d-tt.nl/api/houses", requestOptions)
//     .then(response => response.json())
//     .then(result => {
//         console.log(result)
//         const housesList = document.getElementById('overview');

//         result.forEach(item => {
//             const {
//                 id,
//                 image,
//                 city,
//                 houseNumber,
//                 houseNumberAddition,
//                 street,
//                 zip,
//                 price,
//                 bathrooms,
//                 bedrooms,
//                 size
//             } = item;

//             const listItem = document.createElement('li');
//             listItem.textContent = `
//           id: ${id}, 
//           image: ${image}, 
//           city: ${city}, 
//           houseNumber: ${houseNumber}, 
//           houseNumberAddition: ${houseNumberAddition}, 
//           street: ${street}, 
//           zip: ${zip}, 
//           price: ${price}, 
//           bathrooms: ${bathrooms}, 
//           bedrooms: ${bedrooms}, 
//           size: ${size}`;

//             housesList.appendChild(listItem);
//         });
//     })
//     .catch(error => console.log('error', error));




//   result.forEach(item => {
//     const { constructionYear, createdAt, description, hasGarage, id, image, city, houseNumber, houseNumberAddition, street, zip, madeByMe, price, bathrooms, bedrooms, size } = item;

//     const listItem = document.createElement('li');
//     listItem.textContent = `
//     constructionYear: ${constructionYear}, 
//     createdAt: ${createdAt}, 
//     description: ${description}, 
//     hasGarage: ${hasGarage}, 
//     id: ${id}, 
//     image: ${image}, 
//     city: ${city}, 
//     houseNumber: ${houseNumber}, 
//     houseNumberAddition: ${houseNumberAddition}, 
//     street: ${street}, 
//     zip: ${zip}, 
//     madeByMe: ${madeByMe}, 
//     price: ${price}, 
//     bathrooms: ${bathrooms}, 
//     bedrooms: ${bedrooms}, 
//     size: ${size}`;

//     housesList.appendChild(listItem);
//   });