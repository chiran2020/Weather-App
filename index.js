// Initializing all elements Constants

const temperatureField = document.querySelector(".weather1")
const cityField = document.querySelector(".weather2 p")
const dateField = document.querySelector(".weather2 span")
const emojiField = document.querySelector(".weather3 img")
const weatherField = document.querySelector(".weather3 span")
const searchField = document.querySelector(".search-Field")
const form = document.querySelector("form")

const weatherAlert = document.querySelector(".weather-Alert p")


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




  const [exactDate, exactTime] = time.split(" ")

  //  Used exactDate to format date. making month/day/year. from year/month/day

  const [year, month, day] = exactDate.split("-")

  const DateAfterFormate = month + " " + day + " " + year;

  dateField.innerText = `${exactTime} - ${getDayFullName()} - ${DateAfterFormate}`
  emojiField.src = emoji
  weatherField.innerText = text

  // Weather alert when it's very hot or cold

  const highT = "Hot Temperature Alert!"
  const lowT = "Cold Temperature Alert!"
  const temAlert = () => {
    let temp = temperature

    if (temp > 95) {
      weatherAlert.innerText = highT
    }
    else if (temp < 30) {
      weatherAlert.innerText = lowT
    }
    else {
      weatherAlert.style.display = "none"
    }
  }
  temAlert()



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
  switch (new Date().getDay()) {
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
