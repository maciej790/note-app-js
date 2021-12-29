const slideModalButton = document.querySelector(".header__createNote");
const closeModalButton = document.querySelector(".modal__close");
const modalElement = document.querySelector(".modal");
const createNoteButton = document.querySelector(".modal__submit");
const showCurrencyButton = document.querySelector(".header__toggleCurrency");
const currencyElement = document.querySelector(".header__currency");
const currencyResultsElement = document.querySelector(".header__currencyInfo");

const SlideModalElement = () => modalElement.classList.add("slide");

const CloseModalElement = () => modalElement.classList.remove("slide");

const ScaleCurrencyElement = () => currencyElement.classList.toggle("scale");

const GetCurrencyRatings = async () => {
  const baseURL = "http://api.nbp.pl/api/exchangerates/rates/A/";
  const currencyRatings = await Promise.all([
    fetch(`${baseURL}EUR`),
    fetch(`${baseURL}USD`),
    fetch(`${baseURL}GBP`),
  ]);

  const currencyRatingsData = Promise.all(
    currencyRatings.map((data) => data.json())
  );
  RenderCurrencyData(currencyRatingsData);
};

const RenderCurrencyData = async (data) => {
  const currency = await data;
  currency.map((currency) => {
    const element = document.createElement("div");
    element.classList.add("header__result");
    element.textContent = `${currency.code}:\n${currency.rates[0].mid}`;
    currencyResultsElement.appendChild(element);
  });
};

window.addEventListener("load", GetCurrencyRatings);
slideModalButton.addEventListener("click", SlideModalElement);
closeModalButton.addEventListener("click", CloseModalElement);
showCurrencyButton.addEventListener("click", ScaleCurrencyElement);
