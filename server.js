// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;
// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Reservation & waitlist data
// =============================================================
var tableRes = [
  {
    name: "",
    phoneNumber: "",
    email: "",
    id: ""
  }
];
// Routes
// =============================================================
// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});
app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "views", "reserve.html"));
});
app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "views", "tables.html"));
});
// Get all reservations
app.get("/all", function(req, res) {
  res.json(tableRes);
});
// Search for all reservations - provides JSON
app.get("/api/:tableRes?", function(req, res) {
  var chosen = req.params.tableRes;
  if (chosen) {
    console.log(chosen);
    for (var i = 0; i < tableRes.length; i++) {
      if (chosen === tableRes[i].routeName) {
        return res.json(tableRes[i]);
      }
    }
    return res.json(false);
  }
  return res.json(tableRes);
});
// // Create New reservation - takes in JSON input
// app.post("/api/new", function(req, res) {
//   // req.body hosts is equal to the JSON post sent from the user
//   // This works because of our body-parser middleware
//   var newReservation = req.body;
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
