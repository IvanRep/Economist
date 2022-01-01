import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TransactionType } from '../enums/TransactionType.model';
import { TransactionsService } from '../transactions.service';
import { Transaction } from '../transactions/transaction.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  @Output() deleteTransactionEmitter = new EventEmitter<string>();
  @Output() restoreTransactionEmitter = new EventEmitter<void>();
  @Output() amountEmitter = new EventEmitter<number>();
  @Output() transactionEmitter = new EventEmitter<Transaction>();
  @Input() id:string;

  @Input() transaction:Transaction;

  transactionType:any = TransactionType;

  constructor(private transactionsService:TransactionsService) {
    
    this.transaction = new Transaction('',TransactionType.Other,new Date(),'','','');

    this.id = "";
  }

  ngOnInit(): void {
    //this.transactionsService.getTransaction(this.id).subscribe(result => this.getTransaction(result));
    this.emitAmount();
  }

  /* Unused */
  getTransaction(transaction:any):void {
    this.transaction.setId(transaction.id);
    this.transaction.setStringType(transaction.tipo);
    //Cambio el formato de fecha enviado por la bd para manejarlo como un objeto Date
    const dateSplitted = transaction.fecha.split("/");
    const date = new Date(parseInt(dateSplitted[2]),parseInt(dateSplitted[1])-1,parseInt(dateSplitted[0]));
    this.transaction.setDate(date);
    this.transaction.setConcept(transaction.concepto);
    this.transaction.setUser(transaction.usuario);
    this.transaction.setAmount(transaction.importe);

    this.emitAmount();
  }

  emitAmount():void {
      
    this.amountEmitter.emit(
        this.transaction.getType()==TransactionType.Deposit?this.transaction.getAmount():-this.transaction.getAmount()
    );
  }

  selectTransaction(target:Event):void {
    const spreadedTransaction = document.querySelector('div.selected');
    const transaction = (<HTMLDivElement>target.currentTarget);

    if (transaction!=spreadedTransaction && spreadedTransaction!=undefined) {

      this.restoreTransactionEmitter.emit();

      spreadedTransaction?.classList.remove('selected');
      spreadedTransaction?.parentElement?.querySelector('.options')?.classList.remove('selected');

    }
  
    if (transaction.classList.contains('selected')) {
      this.restoreTransactionEmitter.emit();
      transaction.classList.remove('selected');
      transaction.parentElement?.querySelector('.options')?.classList.remove('selected');
    } else {
      transaction.classList.add('selected');
      transaction.parentElement?.querySelector('.options')?.classList.add('selected');
    }
  }

  editTransaction():void {
 
    this.transactionEmitter.emit(this.transaction);

  }

  deleteTransaction():void {

    this.transactionsService.deleteTransaction(this.getId()).subscribe();

    //Emito la cantidad contraria al amount para que se actualice el balance
    this.amountEmitter.emit(
      this.transaction.getType()==TransactionType.Deposit?-this.transaction.getAmount():this.transaction.getAmount()
    );
    //Borro la transacción de la lista de id del padre
    this.deleteTransactionEmitter.emit(this.transaction.getId());

    
  }

  sleep(delay:any) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
  }

  //Setters
  public setId(id:string):void {
      this.id = id;
  }
 
  //Getters
  public getId():string {
      return this.id;
  }

}
