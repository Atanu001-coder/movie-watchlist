# Movie Watchlist

A simple web app to track movies you want to watch, built to practice
RESTful routing with Node.js, Express and EJS.

## Features
- View all movies (Index)
- Add a movie (New + Create)
- View movie details (Show)
- Edit a movie (Edit + Update with PATCH)
- Delete a movie (Destroy with DELETE)
- Custom 404 page and shared navbar partial

## Concepts Practiced
- RESTful routes and CRUD
- Path parameters (req.params)
- Form data (req.body, express.urlencoded)
- method-override for PATCH and DELETE from HTML forms
- UUID for unique ids
- EJS templates, partials and views directory
- Redirects and static files

## Tech Stack
Node.js, Express, EJS, uuid, method-override

## Run Locally
1. Clone the repo
2. npm install
3. npm run dev
4. Open http://localhost:3000

## Note
Data is stored in an in-memory array, so it resets when the server restarts.