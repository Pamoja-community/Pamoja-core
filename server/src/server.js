const dotenv = require('dotenv')
dotenv.config();

const express = require ("express");
const bodyParser = require ("body-parser");
const cors = require ("cors");
const morgan = require ("morgan");
const mongoose = require ("mongoose");

const userRoute = require ("./Routes/userRoute");


const app = express();
const Port = process.env.PORT || 5000;
const dbUri = process.env.MONGODB_URI;
console.log(dbUri);

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', userRoute);


mongoose.connect(dbUri);

const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
