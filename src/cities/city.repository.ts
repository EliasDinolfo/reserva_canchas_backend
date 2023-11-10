import { Repository } from "../shared/repository.js";
import { City } from "./city.entity.js";
import { db } from "../shared/db/conn.js";
import { ObjectId } from "mongodb";

const cities = db.collection<City>("cities");

export class CityRepository implements Repository<City> {
  public async findAll(): Promise<City[] | undefined> {
    return await cities.find().toArray();
  }

  public async findOne(item: { id: string }): Promise<City | undefined> {
    const _id = new ObjectId(item.id);
    return (await cities.findOne({ _id })) || undefined;
  }

  public async add(item: City): Promise<City | undefined> {
    item._id = (await cities.insertOne(item)).insertedId;
    return item;
  }

  public async update(id: string, item: City): Promise<City | undefined> {
    const _id = new ObjectId(id);
    return (
      (await cities.findOneAndUpdate(
        { _id },
        { $set: item },
        { returnDocument: "after" }
      )) || undefined
    );
  }

  public async delete(item: { id: string }): Promise<City | undefined> {
    const _id = new ObjectId(item.id);
    return (await cities.findOneAndDelete({ _id })) || undefined;
  }
}
