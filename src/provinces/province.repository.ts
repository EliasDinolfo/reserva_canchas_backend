import { Repository } from "../shared/repository.js";
import { Province } from "./province.entity.js";
import { db } from "../shared/db/conn.js";
import { ObjectId } from "mongodb";

const provinces = db.collection<Province>("provinces");

export class ProvinceRepository implements Repository<Province> {
  public async findAll(): Promise<Province[] | undefined> {
    return await provinces.find().toArray();
  }

  public async findOne(item: { id: string }): Promise<Province | undefined> {
    const _id = new ObjectId(item.id);
    return (await provinces.findOne({ _id })) || undefined;
  }

  public async add(item: Province): Promise<Province | undefined> {
    item._id = (await provinces.insertOne(item)).insertedId;
    return item;
  }

  public async update(
    id: string,
    item: Province
  ): Promise<Province | undefined> {
    const _id = new ObjectId(id);
    return (
      (await provinces.findOneAndUpdate(
        { _id },
        { $set: item },
        { returnDocument: "after" }
      )) || undefined
    );
  }

  public async delete(item: { id: string }): Promise<Province | undefined> {
    const _id = new ObjectId(item.id);
    return (await provinces.findOneAndDelete({ _id })) || undefined;
  }
}
