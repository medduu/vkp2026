let number = Number(prompt("Enter a positive integer:"));

let table = "<table>";

for (let row = 1; row <= number; row++) {
    table += "<tr>";

    for (let column = 1; column <= number; column++) {
        let product = row * column;

        table += "<td>" + product + "</td>";
    }

    table += "</tr>";
}

table += "</table>";

document.getElementById("result").innerHTML = table;
