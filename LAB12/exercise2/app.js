const express = require('express');
const app = express();

// ✅ Global Middleware
app.use((req, res, next) => {
  console.log("Global Middleware");
  console.log(`Method: ${req.method}, URL: ${req.url}, Time: ${new Date()}`);
  next();
});

// ✅ Second Middleware
app.use((req, res, next) => {
  console.log("Second Middleware");
  next();
});

// ✅ Route-level Middleware
const checkUser = (req, res, next) => {
  console.log("Route Middleware");
  next();
};

// ✅ Routes
app.get('/', (req, res) => {
  res.send("Home Page");
});

app.get('/users', checkUser, (req, res) => {
  res.send("Users Page");
});

// ✅ Server
app.listen(4000, () => {
  console.log("Server running at http://localhost:4000");
});