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
    name: "Mary",
    phoneNumber: "",
    email: "",
    id: "",
    status: "seated"
  },
    {
    name: "John",
    phoneNumber: "",
    email: "",
    id: "",
    status: "waitlist"
  },
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "app/views", "home.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "app/views", "tables.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "app/views", "waitlist.html"));
});

// Get all reservations
app.get("/api/all", function(req, res) {
  res.json(tableRes);
});

// Search for all reservations - provides JSON
app.get("/api/:tables", function(req, res) {
  var chosen = req.params.tables;
  var matched = [];

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < tableRes.length; i++) {
      if (tableRes[i].status === chosen) {
      	matched.push(tableRes[i]);
      }
    }
    return res.json(matched);
  }
  return res.json(false);
});

// Create New reservation - takes in JSON input
app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newReservation = req.body;
  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);

  tableRes.push(newReservation);

  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
