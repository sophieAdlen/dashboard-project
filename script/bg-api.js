import axios from "axios";

// Variables
const unsplashKey = "iG4ea27tXkAxPtAgMOHooqIp0gly7EXIl-JX0uA6xYU"; //lägg in egen api-nyckel
const url = `https://api.unsplash.com/photos/random/?client_id=${unsplashKey}`;
const htmlElement = document.querySelector("#unsplashRandom");

// Funktion för att hämta en ny bakgrundsbild från Unsplash
async function getUser(url) {
  try {
    const response = await axios.get(url);
    console.log(response.data.urls.regular);
    htmlElement.style.background = `url(${response.data.urls.regular}) no-repeat center center fixed`;
    htmlElement.style.backgroundSize = "cover";
    htmlElement.style.height = "100vh";
  } catch (error) {
    console.error(error);
  }
}

getUser(url);

// Lägg till klicklyssnare för knappen
const bgImageBtn = document.getElementById("bg-image-btn");

bgImageBtn.addEventListener("click", function() {
  getUser(url);
});