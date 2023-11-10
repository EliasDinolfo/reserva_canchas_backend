import { ObjectId } from "mongodb";

export class Province {
  constructor(public name: string, public _id?: ObjectId) {}
}
