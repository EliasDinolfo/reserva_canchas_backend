import crypto from "node:crypto";

export class City {
  constructor(
    public name: string,
    public id_province: number,
    public postal_code: number,
    public id = crypto.randomUUID()
  ) {}
}
