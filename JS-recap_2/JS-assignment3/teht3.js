let numbers = [];
let input;

while (true) {
    input = prompt("Enter a number (or 'done' to finish):");

    if (input === "done") {
        break;
    }

    let number = Number(input);
    numbers.push(number);
}

let evenNumbers = [];

for (let number of numbers) {
    if (number % 2 === 0) {
        evenNumbers.push(number);
    }
}

if (evenNumbers.length > 0) {
    document.getElementById("result").innerHTML =
        "Even Numbers: " + evenNumbers.join(", ");
} else {
    document.getElementById("result").innerHTML =
        "Even Numbers: None";
}
