import { Request, Response, response } from "express";
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

const getAll = (req: Request, res: Response) => {
  res.status(200).json(planets);
};

const getOneById = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json(planets.find((p) => p.id === Number(id)));
};

const create = (req: Request, res: Response) => {
  const { id, name } = req.body;
  const newPlanet = { id, name };
  planets = [...planets, newPlanet];

  res.status(201).json(planets);
};

const updateById = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));

  console.log(planets);
  res.status(200).json(planets);
};
const createImage = async (req: Request, res: Response) => {
  console.log(req.file)
  const {id} = req.params
  const filename = req.file?.path

  if (filename) {
    res.status(200).json({msg: "image created"});
  }
else{
  res.status(404).json({msg:"richiesta non soddisfatta"})
}
};

const deleteById = (req: Request, res: Response) => {
  const { id } = req.params;
  planets = planets.filter((p) => p.id !== Number(id));
  console.log("deleted");
  res.status(200).json(planets);
};

export { getAll, getOneById, updateById, create, deleteById,createImage };
