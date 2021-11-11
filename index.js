require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;
const { connect } = require("./config/dbConfig");
const { connectFirebase } = require("./config/firebaseConfig");
const path = require("path");
const hbs = require("express-handlebars");

//Routes
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");

// database connection
connect();
// firebase connection
connectFirebase();

// middlewares
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
//routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

// home page
app.get("/", (req, res) => {
  res.render("index");
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "views/public")));

//listen
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
