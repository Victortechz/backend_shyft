const express = require("express");
const dotenv = require("dotenv");
const getGitRoutes = require("./routes/getGitRoutes");
PORT = process.env.PORT || 8000;
const cors = require("cors");

dotenv.config();


// intializing  express
const app = express();
app.use(express());
app.use(express.json());



// cross origin resource sharing
app.use(cors());

// routes
app.use("/getrepo", getGitRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
