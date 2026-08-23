function sortArray(numbers, order) {
    let sortedNumbers = [...numbers];

    if (order === "asc") {
        sortedNumbers.sort(function(a, b) {
            return a - b;
        });
    } else if (order === "desc") {
        sortedNumbers.sort(function(a, b) {
            return b - a;
        });
    }

    return sortedNumbers;
}

const numbers = [5, 2, 8, 1, 9];

console.log("Original Array:", numbers);

console.log("Ascending:", sortArray(numbers, "asc"));

console.log("Descending:", sortArray(numbers, "desc"));

const anotherNumbers = [10, 4, 7, 2, 6];

console.log("Another Array Ascending:",
    sortArray(anotherNumbers, "asc"));

console.log("Another Array Descending:",
    sortArray(anotherNumbers, "desc"));
