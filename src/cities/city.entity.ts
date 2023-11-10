import { ObjectId } from "mongodb";

export class City {
  constructor(
    public name: string,
    public id_province: number,
    public postal_code: number,
    public _id?: ObjectId
  ) {}
}
