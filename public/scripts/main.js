var myHeaders = new Headers();
myHeaders.append("X-Api-Key", "0D2payThq_sfnNlBtRod15V3ZMAckuQw");

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

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



fetch("https://api.intern.d-tt.nl/api/houses", requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        const housesList = document.getElementById('overview');
        housesList.innerHTML = ''; // Clear the existing content of the list

        result.forEach(item => {
            const {
                id,
                image,
                location,
                price,
                rooms,
                size
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

            const itemContent = document.createElement('div');
            itemContent.classList.add('house-item-content');

            const imageDiv = document.createElement('div');
            imageDiv.classList.add('house-item-image');
            imageDiv.innerHTML = `<img src="${image}" alt="Image of the house">`;

            const detailsDiv = document.createElement('div');
            detailsDiv.classList.add('house-item-details');
            detailsDiv.innerHTML = `
                <div class="item-property">
                    <span class="property-label">id:</span>
                    <span class="property-value">${id}</span>
                </div>
                <div class="item-property">
                    <span class="property-label">city:</span>
                    <span class="property-value">${city}</span>
                </div>
                <div class="item-property">
                    <span class="property-label">houseNumber:</span>
                    <span class="property-value">${houseNumber}</span>
                </div>
                <div class="item-property">
                    <span class="property-label">houseNumberAddition:</span>
                    <span class="property-value">${houseNumberAddition}</span>
                </div>
                <div class="item-property">
                    <span class="property-label">street:</span>
                    <span class="property-value">${street}</span>
                </div>
                <div class="item-property">
                    <span class="property-label">zip:</span>
                    <span class="property-value">${zip}</span>
                </div>
                <div class="item-property">
                    <span class="property-label">price:</span>
                    <span class="property-value">${price}</span>
                </div>
                <div class="item-property">
                    <span class="property-label">rooms:</span>
                    <span class="property-value">${bedrooms}</span>
                </div>
                <div class="item-property">
                    <span class="property-label">rooms:</span>
                    <span class="property-value">${bathrooms}</span>
                </div>
                <div class="item-property">
                    <span class="property-label">size:</span>
                    <span class="property-value">${size}</span>
                </div>
            `;

            itemContent.appendChild(imageDiv);
            itemContent.appendChild(detailsDiv);
            listItem.appendChild(itemContent);
            housesList.appendChild(listItem);
        });
    })
    .catch(error => console.log('error', error));