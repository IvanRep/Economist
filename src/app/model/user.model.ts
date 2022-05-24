import { Md5 } from "ts-md5";

export class User {

    private username:string;
    private password:string;

    constructor(username:string, password:string) {
        this.username = username;
        this.password = password;
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


}