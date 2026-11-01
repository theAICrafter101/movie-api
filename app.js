const express = require('express');

const app = express();
const PORT = 3000;

// Enable JSON request bodies
app.use(express.json());

// In-memory movie collection
let movies = [
    {
        id: 1,
        title: 'Inception',
        director: 'Christopher Nolan',
        year: 2010
    },
    {
        id: 2,
        title: 'The Matrix',
        director: 'The Wachowskis',
        year: 1999
    },
    {
        id: 3,
        title: 'Parasite',
        director: 'Bong Joon-ho',
        year: 2019
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

app.post("/movies", (req, res) => {
    const {title, director, year} = req.body;

    // Simple validation
    if (!title || !director || !year) {
        return res.status(400).json({
            error: "title, director, and year are required"
        });
    }
    
    const newMovie = {
        id: movies.length + 1,
        title,
        director,
        year
    };

    movies.push(newMovie);

    res.status(201).json(newMovie);
});

// Start server
app.listen(PORT, () => {
    console.log('Server running on port ${PORT}')
});