import { Repository } from "../shared/repository.js";
import { City } from "./city.entity.js";

const cities = [
  new City("San Nicolas", 2, 2900, "e8d391bf-a98e-4c4e-ace4-9862ef523c30"),
  new City("Roldan", 1, 2134, "e8d391bf-a98e-4c4e-ace4-9862ef523c54"),
  new City("Rosario", 1, 2000, "e8d391bf-a98e-4c4e-ace4-9862ef523c54"),
];

export class CityRepository implements Repository<City> {
  public findAll(): City[] | undefined {
    return cities;
  }

  public findOne(item: { id: string }): City | undefined {
    return cities.find((city) => city.id === item.id);
  }

  public add(item: City): City | undefined {
    cities.push(item);
    return item;
  }

  public update(item: City): City | undefined {
    const cityIdx = cities.findIndex((city) => city.id === item.id);

    if (cityIdx !== -1) {
      cities[cityIdx] = { ...cities[cityIdx], ...item };
    }
    return cities[cityIdx];
  }

  public delete(item: { id: string }): City | undefined {
    const cityIdx = cities.findIndex((city) => city.id === item.id);

    if (cityIdx !== -1) {
      const deletedCities = cities[cityIdx];
      cities.splice(cityIdx, 1);
      return deletedCities;
    }
  }
}
