import { Request, Response, NextFunction } from "express";
import { Complex } from "./complex.entity.js";
import { orm } from "../shared/db/orm.js";

const em = orm.em;

function sanitizeComplexInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    email: req.body.email,
    city: req.body.city,
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
  try {
    const complexes = await em.find(
      Complex,
      {},
      { populate: ["city", "city.province"] }
    );
    res.status(200).json({ message: "Complex list", data: complexes });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findAllByCity(req: Request, res: Response) {
  try {
    const city = req.params.city;
    const complexes = await em.find(
      Complex,
      { city },
      { populate: ["city", "city.province"] }
    );
    res.status(200).json({ message: "Complex list", data: complexes });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const complex = await em.findOneOrFail(
      Complex,
      { id },
      { populate: ["city", "city.province"] }
    );
    res.status(200).json({ message: "Complex found", data: complex });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const complex = em.create(Complex, req.body.sanitizedInput);
    await em.flush();
    res.status(201).json({ message: "Complex created", data: complex });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const complexToUpdate = await em.findOneOrFail(Complex, { id });
    em.assign(complexToUpdate, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({ message: "Complex updated", data: complexToUpdate });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const complex = em.getReference(Complex, id);
    await em.removeAndFlush(complex);
    res.status(200).send({ message: "Complex deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export {
  sanitizeComplexInput,
  findAll,
  findAllByCity,
  findOne,
  add,
  update,
  remove,
};
