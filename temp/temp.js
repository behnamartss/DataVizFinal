const fetch = require('node-fetch');

async function getGender(name) {
  const response = await fetch(`https://gender-api.com/get?name=${name}&key=YOUR_API_KEY`);
  const data = await response.json();
  return data.gender;
}

// Example usage
getGender('John').then((gender) => {
  console.log(`The name John is typically associated with ${gender} gender.`);
});