import UserInterface from "./user.interface";

export default class User implements UserInterface {
  constructor(
    private _id: string,
    private _name: string,
    private _email: string
  ) {}

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }
}
