import express, { NextFunction, Request, Response } from "express";
import { provinceRouter } from "./provinces/province.routes.js";
import { cityRouter } from "./cities/city.routes.js";
import { userRouter } from "./users/user.routes.js";
//import { it } from 'node:test'

const app = express();
app.use(express.json());

app.use("/api/provinces", provinceRouter);

app.use("/api/cities", cityRouter);

app.use("/api/users", userRouter);

app.use((_, res) => {
  return res.status(404).send({ message: "Resource not found" });
});

app.listen(3000, () => {
  console.log("Server runnning on http://localhost:3000/");
});
