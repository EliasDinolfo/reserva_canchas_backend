import { Entity, Property, ManyToOne, Rel } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Province } from "../provinces/province.entity.js";

@Entity()
export class City extends BaseEntity {
  @Property({ nullable: false })
  name!: string;

  @Property({ nullable: false })
  postal_code!: string;

  @ManyToOne(() => Province, { nullable: false })
  province!: Rel<Province>;
}
