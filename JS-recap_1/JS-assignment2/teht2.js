let x1 = Number(prompt("Enter x1:"));
let y1 = Number(prompt("Enter y1:"));

let x2 = Number(prompt("Enter x2:"));
let y2 = Number(prompt("Enter y2:"));

let distance = Math.sqrt(
    (x2 - x1) ** 2 + (y2 - y1) ** 2
);

document.getElementById("result").innerHTML =
    "Point 1: (" + x1 + ", " + y1 + ")<br>" +
    "Point 2: (" + x2 + ", " + y2 + ")<br>" +
    "Distance: " + distance;
