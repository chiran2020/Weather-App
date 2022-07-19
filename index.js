// Initializing all elements Constants
alert('To search for Kentucky, Type "Kentucky USA" ')

const temperatureField = document.querySelector(".weather1")
const cityField = document.querySelector(".weather2 p")
const dateField = document.querySelector(".weather2 span")
const emojiField = document.querySelector(".weather3 img")
const weatherField = document.querySelector(".weather3 span")
const searchField = document.querySelector(".search-Field")
const form = document.querySelector("form")


// Default LOCATION

let target = "new york, usa"

// Function to fetch DATA from Weather API

const fetchData = async (target) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=43dbb2ddf4b44abbb78170858221507&q=   ${target}`

    const response = await fetch(url);
    const data = await response.json();

    // Destructuring 
    const {
      current: { temp_f, condition: { text, icon }, },
      location: { name, localtime },
    } = data;

    // Calling update DOM Function
    updateDom(temp_f, name, localtime, icon, text);

  } catch (error) {
    alert("Location Not Found!")
  }

};

// Function to update the DOM
let sign = "°";

function updateDom(temperature, city, time, emoji, text) {
  temperatureField.innerText = temperature + sign;
  cityField.innerText = city

  const exactTime = time.split(" ")[1]

  const exactDate = time.split(" ")[0]
  //  Used exactDate to format date. making month/day/year
  const month = exactDate.split("-")[1]
  const day = exactDate.split("-")[2]
  const year = exactDate.split("-")[0]

  const DateAfterFormate = month + " " + day + " " + year;

  const exactDay = new Date(exactDate).getDay()





  dateField.innerText = `${exactTime} - ${getDayFullName(exactDay)} ${DateAfterFormate}`
  emojiField.src = emoji
  weatherField.innerText = text



}

fetchData(target);


//Function to search for Location

function search(e) {
  e.preventDefault();

  target = searchField.value;
  fetchData(target);
};

// Adding event Listener to the form

form.addEventListener("submit", search);

// Function to get name of the day

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
