import { Md5 } from "ts-md5";

export class User {

    private username:string;
    private password:string;
    private type:string;

    constructor(username:string, password:string, type:string = "admin") {
        this.username = username;
        this.password = password;
        this.type = type
    }

    public hashPassword():void {
        this.password = Md5.hashStr(this.password);
    }

    getUsername():string {
        return this.username;
    }

    getPassword():string {
        return this.password;
    }

    getType():string {
        return this.type;
    }


}