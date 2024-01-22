import axios from "axios";

const unsplashKey = ""; //lägg in egen api-nyckel
const url = `https://api.unsplash.com/photos/random/?client_id=${unsplashKey}`;
const htmlElement = document.querySelector("#unsplashRandom");

// Plocka data från unsplash API
const getUser = async (url) => {
  try {
    const response = await axios.get(url);
    console.log(response.data.urls.regular);
    htmlElement.style.background = `url(${response.data.urls.regular}) no-repeat center center fixed`;
    htmlElement.style.backgroundSize = "cover";
    htmlElement.style.height = "100vh";
  } catch (error) {
    console.error(error);
  }
};

getUser(url);

bgImageBtn.addEventListener("click", () => {
  getUser(url);
});