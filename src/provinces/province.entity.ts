import {
  Entity,
  OneToMany,
  Property,
  Cascade,
  Collection,
} from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { City } from "../cities/city.entity.js";

@Entity()
export class Province extends BaseEntity {
  @Property({ nullable: false, unique: true })
  name!: string;

  @OneToMany(() => City, (city) => city.province, {
    cascade: [Cascade.ALL],
  })
  cities = new Collection<City>(this);
}
