import { Request, Response, NextFunction } from "express";
import { ProvinceRepository } from "./province.repository.js";
import { Province } from "./province.entity.js";

const repository = new ProvinceRepository();

function sanitizeProvinceInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    name: req.body.name,
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
  const province = await repository.findOne({ id });
  if (!province) {
    return res.status(404).send({ message: "Province not found" });
  }
  res.json({ data: province });
}

async function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput;

  const provinceInput = new Province(input.name);

  const province = await repository.add(provinceInput);
  return res.status(201).send({ message: "Province created", data: province });
}

async function update(req: Request, res: Response) {
  const province = await repository.update(
    req.params.id,
    req.body.sanitizedInput
  );

  if (!province) {
    return res.status(404).send({ message: "Province not found" });
  }

  return res
    .status(200)
    .send({ message: "Province updated successfully", data: province });
}

async function remove(req: Request, res: Response) {
  const id = req.params.id;
  const province = await repository.delete({ id });

  if (!province) {
    res.status(404).send({ message: "Province not found" });
  } else {
    res.status(200).send({ message: "Province deleted successfully" });
  }
}

export { sanitizeProvinceInput, findAll, findOne, add, update, remove };
