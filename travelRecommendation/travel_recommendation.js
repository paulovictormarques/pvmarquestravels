let searchbutton = document.getElementById('search-button');
let cityinput = document.getElementById('city-input');
let resultDiv = document.getElementById('resultContainer');
let clearbutton = document.getElementById('clear-button');
let searchInput = document.getElementById('search-input');

const clearResults = () => {
    searchInput.value = '';
    resultDiv.innerHTML = '';
};
clearbutton.addEventListener('click', clearResults);

const showResults = (name, description, imageUrl) => {
    resultDiv.innerHTML = `
        <h2>${name}</h2>
        <p>${description}</p>
        <img src="${imageUrl}" alt="${name}">
    `;
};

fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
          
     const search = () => {
       let searchQuery = searchInput.value.toLowerCase();
       let notFound = true;
       data.countries.map((country) => {
         country.cities.map((city) => {
           if (city.name.toLowerCase().includes(searchQuery)) {
             showResults(city.name, city.description, city.imageUrl);
             notFound = false;
           }
         });
       });
    data.temples.map((temple) => {
      if (temple.name.toLowerCase().includes(searchQuery)) {
        showResults(temple.name, temple.description, temple.imageUrl);
        notFound = false;
      }
    });
    data.beaches.map((beach) => {
      if (beach.name.toLowerCase().includes(searchQuery)) {
        showResults(beach.name, beach.description, beach.imageUrl);
        notFound = false;
      }
    
    });
    if (notFound) {
      resultDiv.innerHTML = `<p>No results found for "${searchQuery}". Please try another search.</p>`;
    }
  };
    searchbutton.addEventListener('click', search);
    searchInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        search();
      }
    });
  })
  .catch(error => console.error('Error fetching travel data:', error));
