import { Repository } from "../shared/repository.js";
import { User } from "./user.entity.js";

const users = [
  new User(
    "Lionel",
    "Messi",
    "35899298",
    "3414352353",
    "messi10@gmail.com",
    "Cliente",
    "liomessi10",
    "elmasgrande"
  ),
  new User(
    "Gabriel",
    "Ramirez",
    "41102345",
    "3412435655",
    "gabo@gmail.com",
    "Administrador",
    "gab0cabj",
    "bokita"
  ),
  new User(
    "Agustin",
    "Lipari",
    "41799878",
    "3364223746",
    "agus_lipari@gmail.com",
    "Operador",
    "lipaDoc",
    "millonario"
  ),
];

export class UserRepository implements Repository<User> {
  public findAll(): User[] | undefined {
    return users;
  }

  public findOne(item: { id: string }): User | undefined {
    return users.find((user) => user.id === item.id);
  }

  public add(item: User): User | undefined {
    users.push(item);
    return item;
  }

  public update(item: User): User | undefined {
    const userIdx = users.findIndex((user) => user.id === item.id);

    if (userIdx !== -1) {
      users[userIdx] = { ...users[userIdx], ...item };
    }
    return users[userIdx];
  }

  public delete(item: { id: string }): User | undefined {
    const userIdx = users.findIndex((user) => user.id === item.id);

    if (userIdx !== -1) {
      const deletedUsers = users[userIdx];
      users.splice(userIdx, 1);
      return deletedUsers;
    }
  }
}
