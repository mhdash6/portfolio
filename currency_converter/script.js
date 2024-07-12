const exchangeRates = { USD: 1 };

// DOM elements for currency conversion
const fromCurrency = document.querySelector(".converter-container #from");
const toCurrency = document.querySelector(".converter-container #to");
const dataList1 = document.querySelector(".datalist1");
const dataList2 = document.querySelector(".datalist2");
const inputAmount = document.querySelector(".converter-container .input-amount");
const result = document.querySelector(".converter-container .result");
const swapBtn = document.querySelector(".converter-container .swap-btn");

// Function to initialize the currency converter
const init = async () => {
  try {
    const res = await fetch('https://www.floatrates.com/daily/usd.json');
    if (!res.ok) {
      throw new Error(`Error fetching data: ${res.statusText}`);
    }

    const data = await res.json();
    populateCurrencyOptions(data);
    fromCurrency.value = dataList1.options[0].value;
    toCurrency.value = dataList2.options[1].value; // Set default to second option
    convert(); // Perform initial conversion
  } catch (error) {
    console.error("Error loading currency data:", error);
  }
};

// Function to populate currency dropdowns
const populateCurrencyOptions = (data) => {
  const fragmentFrom = document.createDocumentFragment();
  const fragment = document.createDocumentFragment();
  for (const currencyCode in data) {
    const { code, name, rate } = data[currencyCode];
    exchangeRates[code] = rate;

    const option1 = document.createElement("option");
    option1.value = code;
    option1.textContent = `${name}`;
    fragmentFrom.appendChild(option1);
  }

const fragmentTo = fragmentFrom.cloneNode(true);
  dataList1.appendChild(fragmentFrom);
  dataList2.appendChild(fragmentTo);
};

// Function to perform the currency conversion
const convert = () => {
  const inputValue = parseFloat(inputAmount.value);

  if(!fromCurrency.value || !toCurrency.value)
  {
    result.innerHTML="Please enter currency name"
    return;
  }else if ( !(fromCurrency.value in exchangeRates))
  {
    result.innerHTML=`${fromCurrency.value} was not found`;
    return;
  }else if (! (toCurrency.value in exchangeRates))
    {
    result.innerHTML=`${toCurrency.value} was not found`;
    return;
  }else if (isNaN(inputValue)) {
    result.innerHTML = `0.00` ;
    return;
  }



  const convertedValue = (inputValue * exchangeRates[toCurrency.value]) / exchangeRates[fromCurrency.value];
  const resultValue = `${convertedValue.toFixed(2)} <span class='result-currency'>${toCurrency.value}</span>`;

  result.innerHTML = resultValue;
};

// Event listeners for conversion actions
toCurrency.addEventListener("change", convert);
fromCurrency.addEventListener("change", convert);
inputAmount.addEventListener("input", convert);

// Event listener for swapping currencies
swapBtn.addEventListener("click", () => {
  const fromCurrencyValue = fromCurrency.value;
  const toCurrencyValue = toCurrency.value;

  fromCurrency.value = toCurrencyValue;
  toCurrency.value = fromCurrencyValue;
  swapBtn.classList.add("rotate")
  convert();
  const resetAnimations= async () =>{
    await new Promise(resolve => setTimeout(()=>{swapBtn.classList.remove("rotate")}, 1700));
  }
  resetAnimations();
});

//clear input onfocus
function clear(eve){
eve.target.value="";
}

fromCurrency.addEventListener("focus", clear)
toCurrency.addEventListener("focus", clear)
// Initialize the currency converter on page load
init();
