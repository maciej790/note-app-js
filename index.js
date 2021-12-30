const slideModalButton = document.querySelector(".header__createNote");
const closeModalButton = document.querySelector(".modal__close");
const modalElement = document.querySelector(".modal");
const createNoteButton = document.querySelector(".modal__submit");
const modalForm = document.querySelector(".modal__form");
const noteTitle = document.querySelector(".modal__title");
const noteText = document.querySelector(".modal__note");
const noteColor = document.querySelectorAll('input[name="color"]');
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
    const resultDiv = document.createElement("div");
    resultDiv.classList.add("header__result");
    resultDiv.textContent = `${currency.rates[0].mid}`;
    currencyResultsElement.appendChild(resultDiv);
  });
};

const HandleCreateNoteButton = (e) => {
  e.preventDefault();
  const noteData = SetFormValues(e);
  const { title, text, color } = noteData;
  title && text && color
    ? SaveNote(noteData)
    : removeEventListener("click", (e) => HandleCreateNoteButton(e));
  CloseModalElement();
};

const SetFormValues = (e) => {
  e.preventDefault();

  const formValues = {
    title: "",
    text: "",
    color: "",
  };

  formValues.title = noteTitle.value;
  formValues.text = noteText.value;

  [...noteColor].map((color) => {
    color.checked ? (formValues.color = color.value) : null;
  });

  return formValues;
};

const SaveNote = (data) => {
  const savedNotes = JSON.parse(localStorage.getItem("notes"));
  if (savedNotes === null) {
    localStorage.setItem("notes", JSON.stringify([data]));
  } else {
    savedNotes.push(data);
    localStorage.setItem("notes", JSON.stringify(savedNotes));
  }
};

window.addEventListener("load", GetCurrencyRatings);
slideModalButton.addEventListener("click", SlideModalElement);
closeModalButton.addEventListener("click", CloseModalElement);
showCurrencyButton.addEventListener("click", ScaleCurrencyElement);
createNoteButton.addEventListener("click", (e) => HandleCreateNoteButton(e));
