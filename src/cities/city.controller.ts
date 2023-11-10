import { Request, Response, NextFunction } from "express";
import { CityRepository } from "./city.repository.js";
import { City } from "./city.entity.js";

const repository = new CityRepository();

function sanitizeCityInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    name: req.body.name,
    id_province: req.body.id_province,
    postal_code: req.body.postal_code,
  };
  //more checks here

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

async function findAll(req: Request, res: Response) {
  res.json({ data: await repository.findAll() });
}

async function findOne(req: Request, res: Response) {
  const id = req.params.id;
  const city = await repository.findOne({ id });
  if (!city) {
    return res.status(404).send({ message: "City not found" });
  }
  res.json({ data: city });
}

async function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput;

  const cityInput = new City(input.name, input.id_province, input.postal_code);

  const city = await repository.add(cityInput);
  return res.status(201).send({ message: "City created", data: city });
}

async function update(req: Request, res: Response) {
  const city = await repository.update(req.params.id, req.body.sanitizedInput);

  if (!city) {
    return res.status(404).send({ message: "City not found" });
  }

  return res
    .status(200)
    .send({ message: "City updated successfully", data: city });
}

async function remove(req: Request, res: Response) {
  const id = req.params.id;
  const city = await repository.delete({ id });

  if (!city) {
    res.status(404).send({ message: "City not found" });
  } else {
    res.status(200).send({ message: "City deleted successfully" });
  }
}

export { sanitizeCityInput, findAll, findOne, add, update, remove };
