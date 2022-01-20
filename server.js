const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

//Listen
app.listen(port, () => console.log(`Listening on Port ${port}`));

// Get Route
app.get("/api", (req, res) => {
  res.send("Server connected to client");
});
