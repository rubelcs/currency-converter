async function fetchCurrencyData() {
  try {
    const response = await fetch("https://www.floatrates.com/daily/gbp.json");
    const currencyData = await response.json();
    convertCurrency(currencyData);
  } catch (error) {
    console.error("Error fetching currency data:", error);
    return null;
  }
}

let errorMessageContainer = document.getElementById("errorMessageContainer");

const disappearErrorMessage = () => {
  errorMessageContainer.innerHTML = "";
};

function displayErrorMessage(message) {
  errorMessageContainer.innerHTML = `<p style='display: flex; justify-content: center; color: crimson; font-size: 20px'>${message}</p>`;
}
// Function to prompt the user and perform currency conversion
function convertCurrency(currencyData) {
  let sourceCurrency = prompt(
    "Enter the currency to convert from (source):"
  ).toLowerCase();
  if (!currencyData[sourceCurrency]) {
    displayErrorMessage("Invalid currency selected for Source");
  } else {
    let destinationCurrency = prompt(
      "Enter the currency to convert to (destination):"
    ).toLowerCase();
    if (!currencyData[destinationCurrency]) {
      displayErrorMessage("Invalid currency selected for destination");
    } else {
      const amount = parseFloat(
        prompt(`Enter the amount in ${sourceCurrency}:`)
      );
      if (amount < 1) {
        displayErrorMessage("Invalid Amount receieved to convert");
      } else {
        const sourceRate = currencyData[sourceCurrency].rate;
        const destinationRate = currencyData[destinationCurrency].rate;
        const convertedAmount = (amount * destinationRate) / sourceRate;

        document.getElementById(
          "currentExchangeRate"
        ).value = `Exchange Rate: 1 ${sourceCurrency} = ${sourceRate} ${destinationCurrency}`;
        document.getElementById("source").value = `${sourceCurrency}`;
        document.getElementById("destination").value = `${destinationCurrency}`;
        document.getElementById(
          "calculationTimestamp"
        ).value = `Date of Calculation: ${new Date().toUTCString()}`;
        document.getElementById(
          "update"
        ).value = `Last Exchange Rate Update: ${currencyData[sourceCurrency].date}`;
        document.getElementById(
          "amountoftransaction"
        ).value = `Converted Amount: ${amount} ${sourceCurrency} = ${convertedAmount.toFixed(
          2
        )} ${destinationCurrency}`;
      }
    }
  }
}

document.getElementById("exchangeingButton").addEventListener("click", () => {
  disappearErrorMessage();
  fetchCurrencyData();
});
