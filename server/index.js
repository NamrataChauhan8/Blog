import express from "express";
import cors from "cors"; // Import CORS middleware
import bodyParser from "body-parser";


import connection from "./database/db.js";
import Router from "./routes/route.js";

const app = express();

app.use(bodyParser.json({extended: true}));

app.use(bodyParser.urlencoded({ extended: true }));


// Enable CORS for all routes
app.use(cors());

// Use your routes
app.use("/", Router);

const PORT = 8000;
app.listen(PORT, () =>
  console.log(`Server is running successfully on PORT ${PORT}`)
);

connection();
