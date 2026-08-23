let celsius = Number(prompt("Enter temperature in Celsius:"));

let fahrenheit = (celsius * 9 / 5) + 32;
let kelvin = celsius + 273.15;

document.getElementById("result").innerHTML =
    "Celsius: " + celsius + " °C<br>" +
    "Fahrenheit: " + fahrenheit + " °F<br>" +
    "Kelvin: " + kelvin + " K";
