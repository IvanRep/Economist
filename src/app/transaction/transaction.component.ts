import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TransactionType } from '../enums/TransactionType.model';
import { TransactionsService } from '../transactions.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  @Output() amountEmitter = new EventEmitter<number>();
  @Input() id:string;
  private type:TransactionType;
  private date:string
  private concept:string;
  private user:string;
  private amount:number;

  transactionType:any = TransactionType; 

  constructor(private transactionsService:TransactionsService) {
      this.id = "";
      this.type = TransactionType.Other;
      this.date = "";
      this.concept = "";
      this.user = "";
      this.amount = 0;
  }

  ngOnInit(): void {

    this.transactionsService.getTransaction(this.id).subscribe(result => this.getTransaction(result));

  }
  emitAmount() {
      
      this.amountEmitter.emit(
          this.type==TransactionType.Deposit?this.amount:-this.amount
      )
  }
  getTransaction(transaction:any):void {
    this.id = transaction.id;
    this.type = this.translateType(transaction.tipo);
    this.date = transaction.fecha;
    this.concept = transaction.concepto;
    this.user = transaction.usuario;
    this.amount = parseFloat(transaction.importe);

    this.emitAmount();
  }

  translateType(type:string) {
    switch(type) {
        case 'Ingreso':
            return TransactionType.Deposit;
        case 'Factura':
            return TransactionType.Bill;
        case 'Compra':
            return TransactionType.Purchase;
        case 'Otro':
            return TransactionType.Other;
        default:
            return TransactionType.Other;
    }
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
  public getAmount():string {
      return Intl.NumberFormat('es', {maximumFractionDigits: 2, minimumFractionDigits: 2}).format(this.amount);
  }


}
