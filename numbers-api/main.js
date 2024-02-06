function fetchNumberFact(number) {
  const apiUrl = `http://numbersapi.com/${number}?json`;

  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => data.text)
    .catch(error => {
      console.error(`Error fetching data for ${number}:`, error);
      return `Failed to fetch data for ${number}`;
    });
}

const favoriteNumber = 146;
const numberOfFacts = 4;

// Use Promise.all to fetch 4 facts for the favorite number concurrently
Promise.all(Array.from({ length: numberOfFacts }, (_, index) => fetchNumberFact(favoriteNumber)))
  .then(facts => {
    const factsContainer = document.getElementById('facts-container');
    facts.forEach((fact, index) => {
      const factElement = document.createElement('p');
      factElement.textContent = `Fact ${index + 1}: ${fact}`;
      factsContainer.appendChild(factElement);
    });
  })
  .catch(error => console.error('Error:', error));