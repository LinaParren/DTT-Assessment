var myHeaders = new Headers();
myHeaders.append("X-Api-Key", "0D2payThq_sfnNlBtRod15V3ZMAckuQw");

var showHouse = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

const houseId = new URLSearchParams(window.location.search).get('houseId');

fetch(`https://api.intern.d-tt.nl/api/houses/${houseId}`, showHouse)
    .then(response => response.json())
    .then(result => {
        console.log(result);
        const houseData = result;

        // Access the elements on house.html and populate them with data

        const housesList = document.getElementById('single_house');

        houseData.forEach(item => {
            const {
                id,
                image,
                location,
                price,
                rooms,
                size,
                madeByMe,
                constructionYear,
                hasGarage,
                description
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

            const houseItem = document.createElement('li');
            houseItem.classList.add('house-item');

            const houseImage = document.createElement('div');
            houseImage.classList.add('house-image');
            houseImage.innerHTML = `
            <img src="${image}" alt="Image of the house">
            `;

            const houseInfo = document.createElement('div');
            houseInfo.classList.add('house-info');

            const iets = document.createElement('div');
            iets.classList.add('house-iets');

            const houseModify = document.createElement('div');
            houseModify.classList.add('house-modify');

            const streetName = document.createElement('div');
            streetName.classList.add('house-streetname');
            streetName.innerHTML = `
                ${street}
                ${houseNumber}
                ${houseNumberAddition}
            `;

            const addressHouse = document.createElement('div');
            addressHouse.classList.add('house-address');
            addressHouse.innerHTML = `
                <img src="../images/ic_location@3x.png" alt="zip code">
                ${zip}
                ${city}
            `;

            const priceHouse = document.createElement('div');
            priceHouse.classList.add('house-price');
            priceHouse.innerHTML = `
                <img src="../images/ic_price@3x.png" alt="price">
                ${price.toLocaleString('nl-NL')}
                <img src="../images/ic_size@3x.png" alt="size">
                ${size} m&sup2;
                <img src="../images/ic_construction_date@3x.png" alt="construction date">
                ${constructionYear}
            `;

            const detailsHouse = document.createElement('div');
            detailsHouse.classList.add('house-details');
            detailsHouse.innerHTML = `
                <img src="../images/ic_bed@3x.png" alt="bedrooms">
                ${bedrooms}
                <img src="../images/ic_bath@3x.png" alt="bedrooms">
                ${bathrooms}
                <img src="../images/ic_garage@3x.png" alt="garage">
                ${hasGarage}
            `;

            const descriptionHouse = document.createElement('div');
            descriptionHouse.classList.add('house-description');
            descriptionHouse.innerHTML = `
                ${description}
            `;

            const houseEdit = document.createElement('div');
            houseEdit.classList.add('house-edit');
            houseEdit.addEventListener('click', () => {
                editHouse(item.id); // Call the editHouse function with the house ID
            });

            const houseDelete = document.createElement('div');
            houseDelete.classList.add('house-delete');


            if (madeByMe == true) {
                const houseEdit = document.createElement('a');
                houseEdit.classList.add('house-edit');
                houseEdit.innerHTML = `
                    <img src="../images/ic_edit@3x.png" alt="edit">
                `;
                houseEdit.addEventListener('click', () => {
                    window.location.href = `edit.html?houseId=${id}`;
                });

                const houseDelete = document.createElement('a');
                houseDelete.classList.add('house-delete');
                houseDelete.innerHTML = `
                    <img src="../images/ic_delete@3x.png" alt="delete">
                `;

                houseModify.appendChild(houseEdit);
                houseModify.appendChild(houseDelete);
            }

            iets.appendChild(streetName);
            iets.appendChild(houseModify);
            houseInfo.appendChild(iets);
            houseInfo.appendChild(addressHouse);
            houseInfo.appendChild(priceHouse);
            houseInfo.appendChild(detailsHouse);
            houseInfo.appendChild(descriptionHouse);
            houseItem.appendChild(houseImage);
            houseItem.appendChild(houseInfo);
            housesList.appendChild(houseItem);

        });

        // ...

        // Access the elements on house.html and populate them with data
        const recommendedHousesList = document.getElementById('recommended_houses');

        // After populating housesList, get the current house's street and city
        const currentStreet = houseData[0].location.street;
        const currentCity = houseData[0].location.city;

        // Filter the result to find similar houses
        const similarHouses = result.filter(item => {
            return (
                (item.location.street === currentStreet || item.location.city === currentCity ) &&
                item.id !== houseId
            );
        });

        // Display the recommended houses
        similarHouses.forEach(item => {

            const {
                id,
                image,
                location,
                price,
                rooms,
                size,
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


            // Create the recommended house item
            const listItem = document.createElement('li');
            listItem.classList.add('recommended-item');

            const houseImage = document.createElement('div');
            houseImage.classList.add('recommended-image');
            houseImage.innerHTML = `
                <img src="${image}" alt="Image of the house">
            `;

            const houseInfo = document.createElement('div');
            houseInfo.classList.add('recommended-info');

            const houseModify = document.createElement('div');
            houseModify.classList.add('recommended-modify');

            const streetName = document.createElement('div');
            streetName.classList.add('recommended-streetname');
            streetName.innerHTML = `
                ${street}
                ${houseNumber}
                ${houseNumberAddition}
            `;

            const priceHouse = document.createElement('div');
            priceHouse.classList.add('recommended-price');
            priceHouse.innerHTML = `&euro; ${price.toLocaleString('nl-NL')}`;

            const addressHouse = document.createElement('div');
            addressHouse.classList.add('recommended-address');
            addressHouse.innerHTML = `
                ${zip}
                ${city}
            `;

            const detailsHouse = document.createElement('div');
            detailsHouse.classList.add('recommended-details');
            detailsHouse.innerHTML = `
                <img src="../images/ic_bed@3x.png" alt="bedrooms">
                ${bedrooms}
                <img src="../images/ic_bath@3x.png" alt="bedrooms">
                ${bathrooms}
                <img src="../images/ic_size@3x.png" alt="bedrooms">
                ${size} m&sup2;
            `;

            listItem.addEventListener('click', () => {
                window.location.href = `house.html?houseId=${id}`;
            });

            houseInfo.appendChild(streetName);
            houseInfo.appendChild(priceHouse);
            houseInfo.appendChild(addressHouse);
            houseInfo.appendChild(detailsHouse);
            listItem.appendChild(houseImage);
            listItem.appendChild(houseInfo);
            recommendedHousesList.appendChild(listItem);

        });

    })

    .catch(error => console.log('error', error));