import { Request, Response, response } from "express";
import pgPromise from "pg-promise";

const db = pgPromise()("postgres://postgres:270290@localhost:5432/postgres");

const setubDb = async () => {
  await db.none(`
DROP TABLE IF EXISTS planets;

  CREATE TABLE planets (
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT  NOT NULL,
    image TEXT
  )`);
  await db.none(`INSERT INTO planets (NAME) VALUES  ('Earth')`)
  await db.none(`INSERT INTO planets (NAME) VALUES  ('Mars')`)
  await db.none(`INSERT INTO planets (NAME) VALUES  ('jupiter')`)

 
};
setubDb()

const getAll = async (req: Request, res: Response) => {
  const planets = await db.many(`SELECT * FROM planets;`)
  console.log(planets)
  res.status(200).json(planets)
};

const getOneById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const planets = await db.one(`SELECT * FROM planets WHERE id=$1;`, Number(id))
  res.status(200).json(planets);
};

const create = async (req: Request, res: Response) => {
  const { id, name } = req.body;
  const planets = await db.one(`INSERT INTO planets (id, name) VALUES ($1, $2) RETURNING *`, [ Number(id), name]);

  res.status(201).json(planets);
};
const createImage = async (req: Request, res: Response) => {
  
  const {id} = req.params
  const filename = req.file?.path

  if (filename) {
    db.none('UPDATE planets SET image=$2 WHERE  id=$1', [Number(id), filename])
    res.status(200).json({msg: "image created"});
  }
else{
  res.status(404).json({msg:"richiesta non soddisfatta"})
}
};
const updateById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const updatedPlanet = await db.one(
    `UPDATE planets SET name = $1 WHERE id = $2`,
    [name, Number(id)])

  //console.log(planets);
  res.status(200).json(updatedPlanet);
};

const deleteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const planets = await db.one("DELETE FROM planets WHERE id=$1 RETURNING *",[Number(id)]);
  res.status(200).json(planets);
};

export { getAll, getOneById, updateById, create, deleteById, createImage };
