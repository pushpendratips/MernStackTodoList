const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/config"); 

const app = express();
const PORT = process.env.PORT || 8000;
const todoRoutes = require('./routes/todoRoutes'); 
const userRoutes = require('./routes/userRoute'); 

app.use(express.json());
app.use(cors());

app.use('/api', todoRoutes); 
app.use('/api', userRoutes); 

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
