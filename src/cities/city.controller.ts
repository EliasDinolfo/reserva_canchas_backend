import { Request, Response, NextFunction } from "express";
import { City } from "./city.entity.js";
import { orm } from "../shared/db/orm.js";

const em = orm.em;

function sanitizeCityInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    name: req.body.name,
    province: req.body.province,
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
  try {
    const cities = await em.find(City, {}, { populate: ["province"] });
    res.status(200).json({ message: "City list", data: cities });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findAllByProvince(req: Request, res: Response) {
  try {
    const province = req.params.province;
    const cities = await em.find(
      City,
      { province },
      { populate: ["province"] }
    );
    res.status(200).json({ message: "City list", data: cities });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const city = await em.findOneOrFail(
      City,
      { id },
      { populate: ["province"] }
    );
    res.status(200).json({ message: "City found", data: city });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const city = em.create(City, req.body.sanitizedInput);
    await em.flush();
    res.status(201).json({ message: "City created", data: city });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const cityToUpdate = await em.findOneOrFail(City, { id });
    em.assign(cityToUpdate, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({ message: "City updated", data: cityToUpdate });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const city = em.getReference(City, id);
    await em.removeAndFlush(city);
    res.status(200).send({ message: "City deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export {
  sanitizeCityInput,
  findAll,
  findAllByProvince,
  findOne,
  add,
  update,
  remove,
};
