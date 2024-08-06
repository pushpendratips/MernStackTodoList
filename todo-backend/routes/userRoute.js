const express = require("express");
const {User} = require("../models/userModel"); 
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWTSECRETKEY; 

// Register route
router.post("/register", async (req, res) => {
    try {
      const user = new User(req.body);
      const result = await user.save();
      res.status(201).send(result);
    } catch (error) {
      res.status(500).send({ message: 'Error registering user', error });
    }
  });
  
  // Login route
  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email, password }).select("-password");
  
      if (user) {
        const token = jwt.sign({ userId: user._id }, jwtSecretKey, { expiresIn: "2h" });
        res.send({ user, auth: token });
      } else {
        res.status(401).send({ result: 'Invalid credentials' });
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).send({ result: 'Internal Server Error' });
    }
  });

  module.exports = router;
