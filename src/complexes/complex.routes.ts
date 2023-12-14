import { Router } from "express";
import {
  sanitizeComplexInput,
  findAll,
  findOne,
  findAllByCity,
  add,
  update,
  remove,
} from "./complex.controller.js";

export const complexRouter = Router();

complexRouter.get("/", findAll);
complexRouter.get("/:id", findOne);
complexRouter.get("/city/:city", findAllByCity);
complexRouter.post("/", sanitizeComplexInput, add);
complexRouter.put("/:id", sanitizeComplexInput, update);
complexRouter.patch("/:id", sanitizeComplexInput, update);
complexRouter.delete("/:id", remove);
