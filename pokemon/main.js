function fetchData(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    });
}

function generateRandomPokemon() {
  const pokemonContainer = document.getElementById('pokemon-container');
  pokemonContainer.innerHTML = ''; 
  
  Promise.all(Array.from({ length: 3 }, (_, index) => getRandomPokemonData()))
    .then(pokemonDetails => {
      pokemonDetails.forEach(details => {
        const pokemonDiv = document.createElement('div');
        pokemonDiv.innerHTML = `
          <h2>${details.name}</h2>
          <img src="${details.imageUrl}" alt="${details.name}">
          <p>${details.description}</p>
        `;
        pokemonContainer.appendChild(pokemonDiv);
      });
    })
    .catch(error => {
      console.error('Error fetching Pokemon details:', error);
    });
}

function getRandomPokemonData() {
  return getPokemonList()
    .then(pokemonList => {
      const randomPokemon = getRandomPokemon(pokemonList);
      const getPokemonDetailsPromise = fetchData(randomPokemon[0].url);

      return getPokemonDetailsPromise.then(details => {
        const speciesUrl = details.species.url;
        const getPokemonSpeciesPromise = fetchData(speciesUrl);

        return getPokemonSpeciesPromise.then(species => {
          const englishDescription = species.flavor_text_entries.find(entry => entry.language.name === 'en');

          const imageUrl = details.sprites.front_default;
          const description = englishDescription ? englishDescription.flavor_text : 'No English description available';

          return {
            name: randomPokemon[0].name,
            imageUrl: imageUrl,
            description: description,
          };
        });
      });
    });
}