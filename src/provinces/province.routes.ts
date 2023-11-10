import { Router } from "express";
import {
  findAll,
  findOne,
  add,
  update,
  remove,
} from "./province.controller.js";

export const provinceRouter = Router();

provinceRouter.get("/", findAll);
provinceRouter.get("/:id", findOne);
provinceRouter.post("/", add);
provinceRouter.put("/:id", update);
provinceRouter.delete("/:id", remove);
