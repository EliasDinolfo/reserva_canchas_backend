import crypto from "node:crypto";

export class User {
  constructor(
    public name: string,
    public lastname: string,
    public dni: string,
    public phone_number: string,
    public email: string,
    public role: string,
    public username: string,
    public password: string,
    public id = crypto.randomUUID()
  ) {}
}
