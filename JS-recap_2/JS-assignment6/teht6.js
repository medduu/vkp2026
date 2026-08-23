let movies = [];

let numberOfMovies = Number(
    prompt("How many movies do you want to rate?")
);

for (let i = 0; i < numberOfMovies; i++) {
    let title = prompt("Enter the movie title:");

    let rating = Number(
        prompt("Enter the rating for " + title + " (1-5):")
    );

    let movie = {
        title: title,
        rating: rating
    };

    movies.push(movie);
}

movies.sort(function(a, b) {
    return b.rating - a.rating;
});

let highestRatedMovie = movies[0];

let output = "<h2>Movies Sorted by Rating</h2>";

for (let movie of movies) {
    output +=
        "<p>" +
        movie.title +
        " - Rating: " +
        movie.rating +
        "/5" +
        "</p>";
}

output +=
    "<h2>Highest-Rated Movie</h2>" +
    "<p>" +
    highestRatedMovie.title +
    " - Rating: " +
    highestRatedMovie.rating +
    "/5" +
    "</p>";

document.getElementById("result").innerHTML = output;
