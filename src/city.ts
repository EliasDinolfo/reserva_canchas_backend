import crypto from 'node:crypto'

export class City {
  constructor(
    public name: string,
    public id_Province: string,
    public id = crypto.randomUUID()
  ) {}
}
