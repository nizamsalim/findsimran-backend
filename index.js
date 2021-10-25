require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;
const { connect } = require("./dbConfig");

//Routes
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");

// database connection
connect();

// middlewares
app.use(cors());
app.use(express.json());
//routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

// home page
app.get("/", (req, res) => {
  res.send(
    " <div style='display:flex;justify-content:center;align-items:center;height:92vh;flex-direction:column' > \
          <h1 style='text-align:center;font-family:arial' > Find Simran API </h1> \
          <h2 style='font-family:arial' > Please visit <a href='https://github.com/nizamsalim/findsimran-backend/blob/master/DOCUMENTATION.md'>documentation</a> \
          for endpoints </h2> \
      </div> "
  );
});

//listen
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
