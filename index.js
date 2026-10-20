//IMPORTS
const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

//APP SETUP
const app = express();
const port = process.env.PORT || 3000;

//DATA
let movies = [
  {
    id: uuidv4(),
    title: "Inception",
    genre: "Sci-Fi",
    watched: false,
  },
  {
    id: uuidv4(),
    title: "The Dark Knight",
    genre: "Action",
    watched: true,
  },
  {
    id: uuidv4(),
    title: "Interstellar",
    genre: "Sci-Fi",
    watched: false,
  },
];

//SETTINGS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

//HOME-ROUTE
app.get("/",(req,res)=>{
    res.redirect("/movies");
});

//INDEX-ROUTE
app.get("/movies",(req,res)=>{
    res.render("index.ejs",{ movies });
});

//NEW-ROUTE
app.get("/movies/new", (req, res) => {
  res.render("new.ejs");
});


//CREATE-ROUTE
app.post("/movies",(req,res)=>{
    const { title,genre } = req.body;
    movies.push({
    id: uuidv4(),
    title,
    genre,
    watched: false,
    });
    res.redirect("/movies");
});

//SHOW-ROUTE
app.get("/movies/:id",(req,res)=>{
  const { id } = req.params;
  const movie = movies.find((m) => m.id === id);
  if (!movie) {
    return res.status(404).send("Movie not found");
  }
  res.render("show.ejs", { movie });
});

//EDIT-ROUTE
app.get("/movies/:id/edit",(req,res)=>{
    const { id } = req.params;
    const movie = movies.find((m) => m.id === id);
    if (!movie) {
    return res.status(404).send("Movie not found");
    }
    res.render("edit.ejs", { movie });
});

//UPDATE-ROUTE
app.patch("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movie = movies.find((m) => m.id === id);

  if (!movie) {
    return res.status(404).send("Movie not found");
  }

  movie.title = req.body.title;
  movie.genre = req.body.genre;
  movie.watched = req.body.watched === "on";

  res.redirect("/movies");
});

//DELETE-ROUTE
app.delete("/movies/:id",(req,res)=>{
  const { id } = req.params;
  movies = movies.filter((m) => m.id !== id);
  res.redirect("/movies");
});

//404-HANDLER
app.use((req, res) => {
  res.status(404).render("404.ejs");
});

//START-SERVER
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});