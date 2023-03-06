const cardForm = document.querySelector(".card-form");
const cardFormSuccess = document.querySelector(".card-form-success");
const confirmButton = document.querySelector("#confirm-button");
const continueButton = document.querySelector("#continue-button");
const cardholder = document.querySelector("#cardholder-name");
const number = document.querySelector("#card-number");
const dates = document.querySelector("#card-date");
const month = document.querySelector("#card-month");
const year = document.querySelector("#card-year");
const cvc = document.querySelector("#card-cvc");

const frontCardNumber = document.querySelector(".front-card__number");
const frontCardName = document.querySelector(".front-card__name");
const frontCardExpDate = document.querySelector(".front-card__exp-date");
const frontCardCvc = document.querySelector(".back-card__cvc");

const errorVisibleDate = (wrapper, element, text) => {
  wrapper.nextElementSibling.innerHTML = text;
  element.classList.add("error-input");
};

const trueVisibleDate = (wrapper, element) => {
  wrapper.nextElementSibling.innerHTML = "";
  element.classList.remove("error-input");
};

const errorVisible = (element, text) => {
  element.nextElementSibling.innerHTML = text;
  element.classList.add("error-input");
};

const trueVisible = (element) => {
  element.nextElementSibling.innerHTML = "";
  element.classList.remove("error-input");
};

const validateCardholder = (cardholder) => {
  const value = cardholder.value;

  if (value === "") {
    errorVisible(cardholder, `Can't be blank.`);
    return false;
  }
  if (value.length < 4) {
    errorVisible(cardholder, `To short name.`);
    return false;
  }
  if (/\d/.test(value)) {
    errorVisible(cardholder, `You used a number.`);
    return false;
  }
  trueVisible(cardholder);
  return true;
};

const validateNumber = (number) => {
  const value = number.value;

  if (value === "") {
    errorVisible(number, `Can't be blank.`);
    return false;
  }
  if (value.length < 19) {
    errorVisible(number, `To short card number.`);
    return false;
  }

  trueVisible(number);
  return true;
};

const validateMonth = (month) => {
  const value = month.value;

  if (value === "") {
    errorVisibleDate(dates, month, `Can't be blank.`);
    return false;
  }
  if (/[^0-9]/.test(value)) {
    errorVisibleDate(dates, month, `You must use only numbers.`);
    return false;
  }
  if (value.length < 2) {
    errorVisibleDate(dates, month, `Month must have 2 numbers.`);
    return false;
  }

  trueVisibleDate(dates, month);
  return true;
};

const validateYear = (year) => {
  const value = year.value;

  if (value === "") {
    errorVisibleDate(dates, year, `Can't be blank.`);
    return false;
  }
  if (/[^0-9]/.test(value)) {
    errorVisibleDate(dates, year, `You must use only numbers.`);
    return false;
  }
  if (value.length < 2) {
    errorVisibleDate(dates, year, `Year must have 2 numbers.`);
    return false;
  }

  trueVisibleDate(dates, year);
  return true;
};

const validateCvc = (cvc) => {
  const value = cvc.value;

  if (value === "") {
    errorVisible(cvc, `Can't be blank.`);
    return false;
  }
  if (/[^0-9]/.test(value)) {
    errorVisible(cvc, `You must use only numbers.`);
    return false;
  }
  if (value.length < 3) {
    errorVisible(cvc, `The cvc code must have 3 numbers.`);
    return false;
  }

  trueVisible(cvc);
  return true;
};

cardholder.addEventListener("input", () => {
  validateCardholder(cardholder);
});

number.addEventListener("input", () => {
  number.value = number.value
    .replace(/[^0-9]/gi, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
  validateNumber(number);
});

month.addEventListener("input", () => {
  validateMonth(month);
});

year.addEventListener("input", () => {
  validateYear(year);
});

cvc.addEventListener("input", () => {
  validateCvc(cvc);
});

if (confirmButton) {
  confirmButton.addEventListener("click", () => {
    if (
      validateCardholder(cardholder) &&
      validateNumber(number) &&
      validateMonth(month) &&
      validateYear(year) &&
      validateCvc(cvc)
    ) {
      frontCardNumber.innerHTML = number.value;
      frontCardName.innerHTML = cardholder.value;
      frontCardExpDate.innerHTML = `${month.value}/${year.value}`;
      frontCardCvc.innerHTML = cvc.value;

      cardForm.style.display = "none";
      cardFormSuccess.style.display = "block";
    }
  });
}

if (continueButton) {
  continueButton.addEventListener("click", () => {
    frontCardNumber.innerHTML = "0000 0000 0000 0000";
    frontCardName.innerHTML = "Jane Appleseed";
    frontCardExpDate.innerHTML = "00/00";
    frontCardCvc.innerHTML = "000";

    number.value = "";
    cardholder.value = "";
    month.value = "";
    year.value = "";
    cvc.value = "";

    cardFormSuccess.style.display = "none";
    cardForm.style.display = "block";
  });
}
