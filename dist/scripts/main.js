// import '../css/style.css'

// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')


var myHeaders = new Headers();
    myHeaders.append("X-Api-Key", "0D2payThq_sfnNlBtRod15V3ZMAckuQw");

    var formdata = new FormData();
    formdata.append("price", "20");
    formdata.append("bedrooms", "1");
    formdata.append("bathrooms", "1");
    formdata.append("size", "1");
    formdata.append("streetName", "Overtoom");
    formdata.append("houseNumber", "21");
    formdata.append("numberAddition", "1");
    formdata.append("zip", "1181TY");
    formdata.append("city", "Amsterdam");
    formdata.append("constructionYear", "1960");
    formdata.append("hasGarage", "false");
    formdata.append("description", "Nice house!");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://api.intern.d-tt.nl/api/houses", requestOptions)
      .then(response => response.json())
      .then(result => {
        const house = result[0]; // Assuming the API returns an array with a single house object

        // Retrieve the necessary values from the API response
        const streetName = house.streetName;
        const price = house.price;
        const zip = house.zip;
        const city = house.city;

        // Update the HTML elements with the retrieved values
        document.getElementById("streetName").textContent = streetName;
        document.getElementById("price").textContent = price;
        document.getElementById("address").textContent = zip + " " + city;
      })
      .catch(error => console.log('error', error));

