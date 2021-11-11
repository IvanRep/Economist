import { TransactionType } from "../enums/TransactionType.model";

export class Transaction {

    private id:string;
    private type:TransactionType;
    private date:string
    private concept:string;
    private user:string;
    private amount:number;

    constructor(id:string, type:TransactionType, date:string, concept:string, user:string, amount:number) {
        this.id = id;
        this.type = type;
        this.date = date;
        this.concept = concept;
        this.user = user;
        this.amount = amount;
    }

    //Setters
    public setId(id:string):void {
        this.id = id;
    }
    public setType(type:TransactionType):void {
        this.type = type;
    }
    public setDate(date:string):void {
        this.date = date;
    }
    public setConcept(concept:string):void {
        this.concept = concept;
    }
    public setUser(user:string):void {
        this.user = user;
    }
    public setAmount(amount:number):void {
        this.amount = amount;
    }
    //Getters
    public getId():string {
        return this.id;
    }
    public getType():TransactionType {
        return this.type;
    }
    public getDate():string {
        return this.date;
    }
    public getConcept():string {
        return this.concept;
    }
    public getUser():string {
        return this.user;
    }
    public getAmount():number {
        return this.amount;
    }
}