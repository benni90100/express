import exp from "constants";
import express from "express";
import "express-async-errors";
import morgan from "morgan";

const TODO: string = "start writing your Express API server here :)";

const app = express();
const port = 3000;

//middleware
app.use(morgan("dev"));
app.use(express.json());

type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets: Planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

//routes get
app.get("/api/planets", (req, res) => {
  res.status(200).json(planets);
});

app.get("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  res.json(planets.find((p) => p.id === Number(id)));
});
//route post
app.post("/api/planets", (req, res) => {
  const { id, name } = req.body;
  const newPlanet = { id, name };
  planets = [...planets, newPlanet];

  res.status(201).json(planets);
});

//put
app.put("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));

  console.log(planets)
  res.status(200).json(planets)
});

//delete

app.delete("/api/planets/:id", (req, res) => {
  const {id} = req.params
  planets = planets.filter((p)=>p.id !== Number(id))
  console.log("deleted")
  res.status(200).json(planets)
})
//start server
app.listen(port, () => {
  console.log(`the server running http://localhost/${port}`);
});

console.log(TODO);
