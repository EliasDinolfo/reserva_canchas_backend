import { Router } from "express";
import {
  sanitizeCityInput,
  findAll,
  findOne,
  findAllByProvince,
  add,
  update,
  remove,
} from "./city.controller.js";

export const cityRouter = Router();

cityRouter.get("/", findAll);
cityRouter.get("/:id", findOne);
cityRouter.get("/province/:province", findAllByProvince);
cityRouter.post("/", sanitizeCityInput, add);
cityRouter.put("/:id", sanitizeCityInput, update);
cityRouter.patch("/:id", sanitizeCityInput, update);
cityRouter.delete("/:id", remove);
