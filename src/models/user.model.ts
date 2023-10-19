import {v4 as createUuid} from "uuid";

export class User {
    private _id: string;

    constructor (
        private _name: string,
        private _email: string,
        private _userName: string,
        private _password: string,
    ) {
        this._id = createUuid();
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name
    }

    public get email(): string {
        return this._email;
    }

    public get username(): string {
        return this._userName
    }

    public get password(): string {
        return this._password
    }

}