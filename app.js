const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());

dotenv.config();

let uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.te788iv.mongodb.net/data-15-april?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(process.env.PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`);
});

app.use("/", userRoutes);
