import { TransactionType } from "../enums/TransactionType.model";

export class Transaction {

    private id:string;
    private type:TransactionType;
    private date:any;
    private dbDate:string;
    concept:string;
    user:string;
    private amount:string;

    constructor(id:string, type:TransactionType, date:any, concept:string, user:string, amount:string) {
        this.id = id;
        this.type = type;
        this.date = date;
        this.dbDate = 'YYYY-MM-DD HH:II:SS';
        this.concept = concept;
        this.user = user;
        this.amount = amount;
    }

    toDataBaseFormat() {
        this.dbDate = this.date.getTime();
    }

    //Setters
    public setId(id:string):void {
        this.id = id;
    }

    public setType(type:TransactionType):void {
        this.type = type;
    }
    public setStringType(type:string):void {
        switch(type) {
            case 'Ingreso':
                this.type = TransactionType.Deposit;
                break;
            case 'Factura':
                this.type = TransactionType.Bill;
                break;
            case 'Compra':
                    this.type = TransactionType.Purchase;
                    break;
            case 'Otro':
                this.type = TransactionType.Other;
                break;
            default:
                this.type = TransactionType.Deposit;        
        }
    }
    public setDate(date:Date):void {
        this.date = date;
    }
    public setConcept(concept:string):void {
        this.concept = concept;
    }
    public setUser(user:string):void {
        this.user = user;
    }
    public setAmount(amount:string):void {
        this.amount = amount;
    }
    //Getters
    public getId():string {
        return this.id;
    }
    public getType():TransactionType {
        return this.type;
    }
    public getDate():any {
        return this.date;
    }

    getLargeMonth():string {
        switch(this.date.getMonth()) {
          case 0:
            return 'Enero';
          case 1:
            return 'Febrero';
          case 2:
            return 'Marzo';
          case 3:
            return 'Abril';
          case 4:
            return 'Mayo';
          case 5:
            return 'Junio';
          case 6:
            return 'Julio';
          case 7:
            return 'Agosto';
          case 8:
            return 'Septiembre';
          case 9:
            return 'Octubre';
          case 10:
            return 'Noviembre';
          case 11:
            return 'Diciembre';
          default:
            return (this.date.getMonth()+1).toString();
        }
      }

    public getConcept():string {
        return this.concept;
    }
    public getUser():string {
        return this.user;
    }
    public getAmount():any {
        if (!this.amount) return '';
        return parseFloat(this.amount);
    }
    public getFormatAmount() {
        const format = Intl.NumberFormat('es', {maximumFractionDigits: 2, minimumFractionDigits: 2});
        return format.format(parseFloat(this.amount));
    }
}