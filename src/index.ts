import express from "express";
import mongoose from "mongoose";
import path from "path";
import resultsRoute from "./routes/resultsRoute";
import usersRoutes from "./routes/usersRoutes";

const app = express();

const PORT = 5000;
const MONGODBURL =
  process.env.MONGODBURL ||
  "mongodb+srv://nakryt:z3zl3in4@cluster0.yk3c7.azure.mongodb.net/snake?retryWrites=true&w=majority";

app.use(express.urlencoded());
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "../public")));

app.use("/users", usersRoutes);
app.use("/results", resultsRoute);

const start = async () => {
  try {
    await mongoose.connect(MONGODBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}`);
    });
  } catch (e) {
    console.log("Server error:", e.message);
    process.exit(1);
  }
};

start();
