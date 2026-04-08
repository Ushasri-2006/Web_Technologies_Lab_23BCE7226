const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/lab12")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

// Model
const User = mongoose.model("User", userSchema);

// CREATE
app.get("/add", async (req, res) => {
    const user = new User({ name: "John", age: 25 });
    await user.save();
    res.send("User Added");
});

// READ
app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// UPDATE
app.get("/update", async (req, res) => {
    await User.updateOne({ name: "John" }, { age: 30 });
    res.send("User Updated");
});

// DELETE
app.get("/delete", async (req, res) => {
    await User.deleteOne({ name: "John" });
    res.send("User Deleted");
});

// Start server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});