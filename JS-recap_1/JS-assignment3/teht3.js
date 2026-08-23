let side1 = Number(prompt("Enter the first side:"));
let side2 = Number(prompt("Enter the second side:"));
let side3 = Number(prompt("Enter the third side:"));

let result;

if (side1 === side2 && side2 === side3) {
    result = "Equilateral triangle";
} else if (side1 === side2 || side1 === side3 || side2 === side3) {
    result = "Isosceles triangle";
} else if (!(side1 === side2 || side1 === side3 || side2 === side3)) {
    result = "Scalene triangle";
}

document.getElementById("result").innerHTML =
    "The triangle is: " + result;
