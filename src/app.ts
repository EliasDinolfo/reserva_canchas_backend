//pnpm start:dev
import "reflect-metadata";
import express from "express";
import { provinceRouter } from "./provinces/province.routes.js";
import { cityRouter } from "./cities/city.routes.js";
import { userRouter } from "./users/user.routes.js";
import { complexRouter } from "./complexes/complex.routes.js";
import { orm } from "./shared/db/orm.js";
import { RequestContext } from "@mikro-orm/core";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  RequestContext.create(orm.em, next);
});

app.use("/api/provinces", provinceRouter);
app.use("/api/cities", cityRouter);
app.use("/api/users", userRouter);
app.use("/api/complexes", complexRouter);

app.use((_, res) => {
  return res.status(404).send({ message: "Resource not found" });
});

app.listen(3000, () => {
  console.log("Server runnning on http://localhost:3000/");
});
