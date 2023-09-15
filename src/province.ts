import crypto from 'node:crypto'

export class Province {
  constructor(
    public name: string,
    public id = crypto.randomUUID()
  ) {}
}
