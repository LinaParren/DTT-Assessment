var houseHeaders = new Headers();
houseHeaders.append("X-Api-Key", "0D2payThq_sfnNlBtRod15V3ZMAckuQw");

var houseOptions = {
    method: 'GET',
    headers: houseHeaders,
    redirect: 'follow'
};

const houseId = new URLSearchParams(window.location.search).get('houseId');

// Fetch details of a specific house using houseId
fetch(`https://api.intern.d-tt.nl/api/houses/${houseId}`, houseOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result);
        const houseData = result;

        // Get element for displaying single house details
        const housesList = document.getElementById('single_house');

        // Iterate through each house item in result
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

            // Create elements to represent house items in the list
            const houseItem = document.createElement('li');
            houseItem.classList.add('house-item');

            const houseImage = document.createElement('div');
            houseImage.classList.add('house-image');
            houseImage.innerHTML = `
            <img src="${image}" alt="Image of the house">
            `;

            const houseInfo = document.createElement('div');
            houseInfo.classList.add('house-info');

            const houseTitel = document.createElement('div');
            houseTitel.classList.add('house-streetandmodify');

            const houseModify = document.createElement('div');
            houseModify.classList.add('house-modify');

            const streetHouse = document.createElement('h2');
            streetHouse.classList.add('house-streetname');
            streetHouse.innerHTML = `
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

            // Check if house is created by the current user (madeByMe)
            if (madeByMe == true) {
                // Create edit and delete buttons for user's own listings
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

                // Create overlay over full body, for delete confirmation popup
                const overlay = document.createElement('div');
                overlay.classList.add('house-overlay');

                document.body.appendChild(overlay);

                houseModify.appendChild(houseEdit);
                houseModify.appendChild(houseDelete);
            }

            // Function to display delete confirmation popup
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

                // Function to delete listing
                function deleteListing() {
                    const deleteHeaders = new Headers();
                    deleteHeaders.append('X-Api-Key', '0D2payThq_sfnNlBtRod15V3ZMAckuQw');

                    const deleteOptions = {
                        method: 'DELETE',
                        headers: deleteHeaders,
                        redirect: 'follow'
                    };

                    fetch(`https://api.intern.d-tt.nl/api/houses/${houseId}`, deleteOptions)
                        .then(response => {
                            if (response.ok) {
                                console.log('Listing deleted successfully');
                            } else {
                                console.log('Failed to delete the listing');
                            }
                        })
                        .catch(error => console.log('Error:', error));

                    // Remove popup from screen
                    overlay.classList.remove('show');
                    popup.classList.remove('show');
                }

                // Create button to go back from popup
                const gobackButton = document.createElement('button');
                gobackButton.classList.add('gobackButton');
                gobackButton.innerHTML = `
                  GO BACK
                `;
                gobackButton.addEventListener('click', goBack);
                popup.appendChild(gobackButton);

                // Remove popup from screen and go back to page
                function goBack() {
                    overlay.classList.remove("show");
                    popup.classList.remove("show");
                }
            }

            houseTitel.appendChild(streetHouse);
            houseTitel.appendChild(houseModify);
            houseInfo.appendChild(houseTitel);
            houseInfo.appendChild(addressHouse);
            houseInfo.appendChild(priceHouse);
            houseInfo.appendChild(detailsHouse);
            houseInfo.appendChild(descriptionHouse);
            houseItem.appendChild(houseImage);
            houseItem.appendChild(houseInfo);
            housesList.appendChild(houseItem);

        });

        // Get recommended houses list element
        const recommendedHousesList = document.getElementById('recommended_houses');

        // Filter out similar houses based on location, exclude the current house
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

        // Loop through similar houses and create elements to display them
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

            // Redirect to selected house when clicked
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
