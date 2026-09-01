const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");


const scoreRoutes = require("./routes/scoreRoutes");
const apiRoutes = require("./routes/apiRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "../public")));

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);
app.set("layout", "layouts/main");

// Routes
app.use(scoreRoutes);
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.redirect("/score");
});

// 404
app.use((req, res) => {
  res.status(404).render("404", {
    title: "Page Not Found"
  });
});

module.exports = app;