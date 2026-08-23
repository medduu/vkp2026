let numbers = [];

for (let i = 1; i <= 5; i++) {
    let number = Number(prompt("Enter Number " + i + ":"));
    numbers.push(number);
}

console.log("Numbers:", numbers);

let searchNumber = Number(prompt("Enter a Number to Search:"));

if (numbers.includes(searchNumber)) {
    console.log("Number " + searchNumber + " is found in the array.");
} else {
    console.log("Number " + searchNumber + " is not found in the array.");
}

numbers.pop();

console.log("Updated Numbers:", numbers);

numbers.sort(function(a, b) {
    return a - b;
});

console.log("Sorted Numbers:", numbers);

document.getElementById("result").innerHTML =
    "Numbers: " + numbers.join(", ") + "<br>" +
    "Search result for " + searchNumber + ": " +
    (numbers.includes(searchNumber) ? "Found" : "Not found") + "<br>" +
    "The last number was removed and the array was sorted.<br>" +
    "Sorted Numbers: " + numbers.join(", ");
