const temperatureField = document.querySelector(".weather1")
const cityField = document.querySelector(".weather2 p")
const dateField = document.querySelector(".weather2 span")
const emojiField = document.querySelector(".weather3 img")
const weatherField = document.querySelector(".weather3 span")
// const searchField = document.querySelector(".searchField")
// const form = document.querySelector("form")


// Fetching Data from weather api

let target = "kentucky,USA"

const fetchData = async () => {

  const url = `https://api.weatherapi.com/v1/current.json?key=43dbb2ddf4b44abbb78170858221507&q=${target}`

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  const {
    current: { temp_f, condition: { text, icon }, },
    location: { name },
  } = data;

  updateDom(temp_f, name, icon, text);

};

function updateDom(temperature, city, emoji, text) {
  temperatureField.innerText = temperature
  cityField.innerText = city

  emojiField.src = emoji
  weatherField.innerText = text

}

fetchData();
