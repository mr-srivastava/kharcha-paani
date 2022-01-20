const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

//
const whitelist = [
  "http://localhost:3000",
  "http://localhost:5000",
  "https://kharcha-paani.herokuapp.com/",
];
const corsOptions = {
  origin: function (origin, callback) {
    console.log("**Origin of request" + origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin accepted");
      callback(null, true);
    } else {
      console.log("Origin rejected");
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));
//Listen
app.listen(port, () => console.log(`Listening on Port ${port}`));

//serve react
if (process.env.NODE_ENV === "production") {
  //Serve any static file
  app.use(express.static(path.join(__dirname, "client/build")));

  //Handle react route and return all requests to react
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// Get Route
app.get("/api", (req, res) => {
  res.send("Server connected to client");
});
