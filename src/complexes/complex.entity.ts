import { Entity, Property, ManyToOne, Rel } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { City } from "../cities/city.entity.js";

@Entity()
export class Complex extends BaseEntity {
  @Property({ nullable: false })
  name!: string;

  @Property({ nullable: false })
  address!: string;

  @Property({ nullable: false })
  phone!: string;

  @Property({ nullable: false })
  email!: string;

  @ManyToOne(() => City, { nullable: false })
  city!: Rel<City>;
}
