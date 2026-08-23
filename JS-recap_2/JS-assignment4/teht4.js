function sortArray(numbers) {
    let sortedNumbers = [...numbers];

    sortedNumbers.sort(function(a, b) {
        return a - b;
    });

    return sortedNumbers;
}

const numbers = [5, 2, 8, 1, 9];

console.log("Original Array:", numbers);
console.log("Sorted Array:", sortArray(numbers));
