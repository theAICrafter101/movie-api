const express = require('express');

const app = express();
const PORT = 3000;

// Enable JSON request bodies
app.use(express.json());

// In-memory movie collection
let movies = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi"
  },
  {
    id: 2,
    title: "The Matrix",
    year: 1999,
    genre: "Sci-Fi"
  },
  {
    id: 3,
    title: "Parasite",
    year: 2019,
    genre: "Thriller"
  }
];

// Temporary test route
app.get ("/", (req, res) => {
    res.send("Movie API is running");
});

// Get all movies
app.get("/movies", (req, res) => {
    res.status(200).json(movies);
})

// Get a specific movie by ID
app.get("/movies/:id", (req, res) => {
    const movieId = parseInt(req.params.id);

    const movie = movies.find(movie => movie.id === movieId);

    if (!movie) {
        return res.status(404).json({
            error: 'Movie not found'
        });
    }
    res.status(200).json(movie);
});

// Add a new movie
app.post("/movies", (req, res) => {
    const {title, year, genre} = req.body;
    // Simple validation
    if (!title || !year || !genre) {
        return res.status(400).json({
            error: "title, year, and genre are required"
        });
    }
    const newMovie = {
        id: movies.length + 1,
        title,
        year,
        genre
    };
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

// Update an existing movie
app.put("/movies/:id", (req, res) => {
    const movieId = parseInt(req.params.id);
    const {title, year, genre} = req.body;

    const movieIndex = movies.findIndex(movie => movie.id === movieId);

    if (movieIndex === -1) {
        return res.status(404).json({
            error: 'Movie not found'
        });
    }

    // Update the movie
    movies[movieIndex] = {
        id: movieId,
        title,
        genre,
        year
    };
    res.status(200).json(movies[movieIndex]);
});

// PUT /movies/:id route to update only the title of a movie
app.put("/movies/:id", (req, res) => {
    const movieId = parseInt(req.params.id);

    const movieIndex = movies.findIndex(movie => movie.id === movieId);

    // Check if the movie exists
    if (movieIndex === -1) {
        return res.status(404).json({
            error: 'Movie not found'
        });
    }
    
    const {title, year, genre } = req.body;
    
    // Validate required fields
    if (!title || !year || !genre) {
        return res.status(400).json({
            error: "title, year, and genre are required"
        });
    }

    const updateMovie = {
        id: movieId,
        title,
        year,
        genre
    };

    movies[movieIndex] = updateMovie;

    res.status(200).json(updateMovie);
});

// Start server
app.listen(PORT, () => {
    console.log('Server running on port ${PORT}')
});
