import exp from "constants";
import express from "express";
import "express-async-errors";
import morgan from "morgan";
import { getAll, getOneById, updateById, create, deleteById } from "./controllers/planets.js"
const TODO: string = "start writing your Express API server here :)";

const app = express();
const port = 3000;

//middleware
app.use(morgan("dev"));
app.use(express.json());



//routes get
app.get("/api/planets", getAll);

app.get("/api/planets/:id", getOneById);
//route post
app.post("/api/planets", create);

//put
app.put("/api/planets/:id", updateById);

//delete

app.delete("/api/planets/:id", deleteById)
//start server
app.listen(port, () => {
  console.log(`the server running http://localhost/${port}`);
});

console.log(TODO);
