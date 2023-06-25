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

            const streetName = document.createElement('h2');
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
                editHouse(item.id);
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
                houseDelete.addEventListener('click', popupDelete);

                const overlay = document.createElement('div');
                overlay.classList.add('house-overlay');

                document.body.appendChild(overlay);

                houseModify.appendChild(houseEdit);
                houseModify.appendChild(houseDelete);
            }

            function popupDelete() {
                const overlay = document.querySelector(".house-overlay");
                const popup = document.getElementById("deletePopup");

                overlay.classList.add("show");
                popup.classList.add("show");

                const deleteButton = document.createElement('button');
                deleteButton.classList.add('deleteButton');
                deleteButton.innerHTML = `
                  YES, DELETE
                `;
                deleteButton.addEventListener('click', deleteListing);
                popup.appendChild(deleteButton);

                function deleteListing() {
                    const headers = new Headers();
                    headers.append('X-Api-Key', '0D2payThq_sfnNlBtRod15V3ZMAckuQw');

                    const requestOptions = {
                        method: 'DELETE',
                        headers: headers,
                        redirect: 'follow'
                    };

                    fetch(`https://api.intern.d-tt.nl/api/houses/${houseId}`, requestOptions)
                        .then(response => {
                            if (response.ok) {
                                console.log('Listing deleted successfully');
                            } else {
                                console.log('Failed to delete the listing');
                            }
                        })
                        .catch(error => console.log('Error:', error));

                    overlay.classList.remove('show');
                    popup.classList.remove('show');
                }

                const gobackButton = document.createElement('button');
                gobackButton.classList.add('gobackButton');
                gobackButton.innerHTML = `
                  GO BACK
                `;
                gobackButton.addEventListener('click', goBack);
                popup.appendChild(gobackButton);

                function goBack() {
                    overlay.classList.remove("show");
                    popup.classList.remove("show");
                }
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

        const recommendedHousesList = document.getElementById('recommended_houses');

        const similarHouses = result.filter(item => {
            console.log(item.location.city)
            console.log(houseData[0].location.city)
            console.log(item.location.street)
            console.log(item.id)
            console.log(houseData[0].id)
            return (
                (item.location.street == houseData[0].location.street || item.location.city == houseData[0].location.city) &&
                item.id !== houseId
            );
        });

        // recommendedHousesList.innerHTML = '';      ----?----

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

            const listItems = document.createElement('li');
            listItems.classList.add('recommended-item');

            const houseImages = document.createElement('div');
            houseImages.classList.add('recommended-image');
            houseImages.innerHTML = `
                <img src="${image}" alt="Image of the house">
            `;

            const houseInfos = document.createElement('div');
            houseInfos.classList.add('recommended-info');

            const houseModifys = document.createElement('div');
            houseModifys.classList.add('recommended-modify');

            const streetNames = document.createElement('div');
            streetNames.classList.add('recommended-streetname');
            streetNames.innerHTML = `
                ${street}
                ${houseNumber}
                ${houseNumberAddition}
            `;

            const priceHouses = document.createElement('div');
            priceHouses.classList.add('recommended-price');
            priceHouses.innerHTML = `&euro; ${price.toLocaleString('nl-NL')}`;

            const addressHouses = document.createElement('div');
            addressHouses.classList.add('recommended-address');
            addressHouses.innerHTML = `
                ${zip}
                ${city}
            `;

            const detailsHouses = document.createElement('div');
            detailsHouses.classList.add('recommended-details');
            detailsHouses.innerHTML = `
                <img src="../images/ic_bed@3x.png" alt="bedrooms">
                ${bedrooms}
                <img src="../images/ic_bath@3x.png" alt="bedrooms">
                ${bathrooms}
                <img src="../images/ic_size@3x.png" alt="bedrooms">
                ${size} m&sup2;
            `;

            listItems.addEventListener('click', () => {
                window.location.href = `house.html?houseId=${id}`;
            });

            houseInfos.appendChild(streetNames);
            houseInfos.appendChild(priceHouses);
            houseInfos.appendChild(addressHouses);
            houseInfos.appendChild(detailsHouses);
            listItems.appendChild(houseImages);
            listItems.appendChild(houseInfos);
            recommendedHousesList.appendChild(listItems);

        });

    })

    .catch(error => console.log('error', error));
