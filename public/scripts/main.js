var myHeaders = new Headers();
myHeaders.append("X-Api-Key", "0D2payThq_sfnNlBtRod15V3ZMAckuQw");

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

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

            const houseEdit = document.createElement('div');
            houseEdit.classList.add('house-edit');
            const houseDelete = document.createElement('div');
            houseDelete.classList.add('house-edit');


            if (madeByMe == true) {                
                houseEdit.innerHTML = `
                    <img src="../images/ic_edit@3x.png" alt="bedrooms">
                `;
                houseDelete.innerHTML = `
                    <img src="../images/ic_delete@3x.png" alt="bedrooms">
                `;
            }

            houseInfo.appendChild(streetName);
            houseInfo.appendChild(priceHouse);
            houseInfo.appendChild(addressHouse);
            houseInfo.appendChild(detailsHouse);
            houseModify.appendChild(houseEdit);
            houseModify.appendChild(houseDelete);
            listItem.appendChild(houseImage);
            listItem.appendChild(houseInfo);
            listItem.appendChild(houseModify);
            housesList.appendChild(listItem);

        });
    })
    .catch(error => console.log('error', error));




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