import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";

@Entity()
export class User extends BaseEntity {
  @Property({ nullable: false })
  name!: string;

  @Property({ nullable: false })
  lastname!: string;

  @Property({ nullable: false, unique: true })
  dni!: string;

  @Property()
  phone_number!: string;

  @Property({ nullable: false, unique: true })
  email!: string;

  @Property({ nullable: false })
  role!: string;

  @Property({ nullable: false, unique: true })
  username!: string;

  @Property({ nullable: false })
  password!: string;
}
