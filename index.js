import express from "express";
import dotenv from "dotenv";
import router from "./routes.js";
import getConnection from "./src/helper/dbconnection.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is working");
});

router(app);

await getConnection();

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
