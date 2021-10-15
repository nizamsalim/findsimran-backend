
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;
const { connect } = require("./dbConfig");


//Routes
const authRoutes=require('./routes/auth');
const profileRoutes=require('./routes/profile');

// database connection
connect();

// middlewares
app.use(cors());
app.use(express.json());
//routes
app.use('/api/auth',authRoutes);
app.use('/api/profile',profileRoutes);

//listen 
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
