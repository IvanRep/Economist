import { TransactionType } from "../enums/TransactionType.model";
import { User } from "./user.model";

export class Transaction {

    private id:string;
    private type:TransactionType;
    private date:any;
    concept:string;
    user:string;
    private amount:string;
    selected:boolean
    private appUser:User;

    constructor(appUser:User,id:string = '', type:TransactionType = TransactionType.Deposit, date:any = new Date(), concept:string = '', user:string = '', amount:string = '', selected:boolean = false) {
        this.id = id;
        this.type = type;
        this.date = date;
        this.concept = concept;
        this.user = user;
        this.amount = amount;
        this.selected = selected;
        this.appUser = appUser;
    }

    public clone():Transaction {

      return new Transaction(this.appUser,this.id,this.type,this.date,this.concept,this.user,this.amount);
    }

    public clear() {
      this.id = '';
      this.type = TransactionType.Deposit;
      this.date = new Date();
      this.concept = '';
      this.user = '';
      this.amount = '';
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
    public setDate(date:Date, edit = false):void {
      if (edit) {
        date.setHours(this.date.getHours());
        date.setMinutes(this.date.getMinutes());
        date.setSeconds(this.date.getSeconds());
      } 
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
    public setSelected(selected:boolean):void {
      this.selected = selected;
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

    normalizeDate() {
        const day = this.date.getDate() <= 9 ? '0'+this.date.getDate() : this.date.getDate();
        const month = (this.date.getMonth()) < 9 ? '0'+(this.date.getMonth()+1) : (this.date.getMonth()+1);
        const hours = this.date.getHours() <= 9 ? '0'+this.date.getHours() : this.date.getHours();
        const min = this.date.getMinutes() <= 9 ? '0'+this.date.getMinutes() : this.date.getMinutes();
        const sec = this.date.getSeconds() <= 9 ? '0'+this.date.getSeconds() : this.date.getSeconds();
  
        this.date = day+'-'+month+'-'+this.date.getFullYear()+' '+hours+':'+min+':'+sec;
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

    public isSelected() {
      return this.selected;
    }
}