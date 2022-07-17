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
    location: { name, localtime },
  } = data;

  updateDom(temp_f, name, localtime, icon, text);

};

function updateDom(temperature, city, time, emoji, text) {
  temperatureField.innerText = temperature
  cityField.innerText = city
  const exactTime = time.split(" ")[1]
  const exactDate = time.split(" ")[0]

  const exactDay = new Date(exactDate).getDay()

  dateField.innerText = `${exactTime} - ${getDayFullName(exactDay)} ${exactDate}`
  emojiField.src = emoji
  weatherField.innerText = text


}

fetchData();

function getDayFullName(num) {
  switch (num) {
    case 0:
      return "Sunday"
    case 1:
      return "Monday"
    case 2:
      return "Tuesday"
    case 3:
      return "Wednesday"
    case 4:
      return "Thursday"
    case 5:
      return "Friday"
    case 6:
      return "Saturday"
    default:
      return "Don't know!"
      break;
  }

}
