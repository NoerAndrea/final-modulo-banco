import { v4 as createUuid } from "uuid";

export class Tweet {
    private _id: string;
    
    constructor (
        private _content: string,
        private _type: string,
        private _userID: string,
    ){
        this._id = createUuid()
    }

    public get id(): string{
        return this._id
    }

    public get content(): string{
        return this._content
    }

    public get type(): string{
        return this._type
    }

    public get userId(): string{
        return this._userID
    }
}