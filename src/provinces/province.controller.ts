import { Request, Response } from "express";
import { orm } from "../shared/db/orm.js";
import { Province } from "./province.entity.js";
import { City } from "../cities/city.entity.js";

/* function sanitizeProvinceInput(
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
} */

const em = orm.em;

async function findAll(req: Request, res: Response) {
  try {
    const provinces = await em.find(Province, {});
    res.status(200).json({ message: "Province list", data: provinces });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const province = await em.findOneOrFail(Province, { id });
    res.status(200).json({ message: "Province found", data: province });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  /* const name = req.body.name;
  let province = await em.findOne(Province, { name });
  if (province !== null) {
    return res.status(400).json({
      message: "La provincia ingresada ya existe." + province + req.body.name,
    });
  } */
  try {
    const province = em.create(Province, req.body);
    await em.flush();
    res.status(201).json({ message: "Province created", data: province });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const province = em.getReference(Province, id);
    em.assign(province, req.body);
    await em.flush();
    res.status(200).json({ message: "Province updated" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const province = em.getReference(Province, id);
    const cities = await em.find(City, { province: id });
    if (cities.length > 0) {
      return res.status(500).send({
        message:
          "No se puede eliminar la provincia porque tiene " +
          cities.length +
          " ciudad/es asociada/s.",
      });
    } else {
      await em.removeAndFlush(province);
      res.status(200).send({ message: "Province deleted" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { findAll, findOne, add, update, remove };
