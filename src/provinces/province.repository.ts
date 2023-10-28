import { Repository } from "../shared/repository.js";
import { Province } from "./province.entity.js";

const provinces = [
  new Province("Santa Fe"),
  new Province("Buenos Aires"),
  new Province("Cordoba"),
];

export class ProvinceRepository implements Repository<Province> {
  public findAll(): Province[] | undefined {
    return provinces;
  }

  public findOne(item: { id: string }): Province | undefined {
    return provinces.find((province) => province.id === item.id);
  }

  public add(item: Province): Province | undefined {
    provinces.push(item);
    return item;
  }

  public update(item: Province): Province | undefined {
    const provinceIdx = provinces.findIndex(
      (province) => province.id === item.id
    );

    if (provinceIdx !== -1) {
      provinces[provinceIdx] = { ...provinces[provinceIdx], ...item };
    }
    return provinces[provinceIdx];
  }

  public delete(item: { id: string }): Province | undefined {
    const provinceIdx = provinces.findIndex(
      (province) => province.id === item.id
    );

    if (provinceIdx !== -1) {
      const deletedProvinces = provinces[provinceIdx];
      provinces.splice(provinceIdx, 1);
      return deletedProvinces;
    }
  }
}
