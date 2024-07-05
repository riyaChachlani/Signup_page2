const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5007;

app.use(cors());

app.use(bodyParser.json());
const MONGODB_URI =
  "mongodb+srv://riyac0303:Rr%4003032002@cluster0.ocehira.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Define a User schema
const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Signup route
app.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).send("All fields are required");
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(201)
      .json({ success: false, message: "Email already in use" });
  }

  const newUser = new User({
    fullName,
    email,
    password,
  });
  //return res.json({ success: true, message: "User registered successfully" });
  try {
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error registering user" });
  }
});

//deployment code...
const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
