import axios from "axios";

const fetchData = async () => {
  try {
    const response = await axios.get("https://type.fit/api/quotes");
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error('error message: Data not found');
    } else {
      console.error(error);
    }
  }
};

const displayRandomQuote = async () => {
  const quotesContainer = document.querySelector(".quotes");
  quotesContainer.innerHTML = ""; 

  const quotesData = await fetchData();

  if (quotesData) {
    const randomIndex = Math.floor(Math.random() * quotesData.length);
    const randomQuote = quotesData[randomIndex].text;
    const quoteElement = document.createElement("p");
    quoteElement.textContent = randomQuote;

    quotesContainer.appendChild(quoteElement);
  }
};

document.getElementById("quotes-btn").addEventListener("click", displayRandomQuote);
