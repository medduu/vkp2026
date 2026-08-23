let number = Number(prompt("Enter a positive integer:"));

let sum = 0;

for (let i = 1; i <= number; i++) {
    sum = sum + i;
}

document.getElementById("result").innerHTML =
    "Number: " + number + "<br>" +
    "Sum: " + sum;
