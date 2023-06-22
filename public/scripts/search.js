// // Fetch the API data
// fetch("https://api.intern.d-tt.nl/api/houses")
//   .then(response => response.json())
//   .then(data => {
//     const searchInput = document.getElementById('searchbar');
//     const resultsList = document.getElementById('results');

//     // Function to filter the data based on search input
//     const searchHandler = () => {
//       const searchTerm = searchInput.value.toLowerCase();
//       const filteredData = data.filter(item => {
//         // Modify the conditions based on your desired search criteria
//         return (
//           item.description.toLowerCase().includes(searchTerm) ||
//           item.location.city.toLowerCase().includes(searchTerm)
//         );
//       });

//       // Display the filtered results
//       displayResults(filteredData);
//     };

//     // Function to display the search results
//     const displayResults = (results) => {
//       resultsList.innerHTML = '';

//       if (results.length === 0) {
//         const noResults = document.createElement('li');
//         noResults.textContent = 'No results found.';
//         resultsList.appendChild(noResults);
//       } else {
//         results.forEach(result => {
//           const listItem = document.createElement('li');
//           listItem.textContent = result.description;
//           resultsList.appendChild(listItem);
//         });
//       }
//     };

//     // Add event listener to trigger search on input change
//     searchInput.addEventListener('input', searchHandler);
//     searchInput.addEventListener('keydown', (event) => {
//       if (event.key === 'Enter') {
//         event.preventDefault(); // Prevent form submission
//         searchHandler();
//       }
//     });
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
