import { Component } from '@angular/core';
import { ActionWindow } from './enums/ActionWindow.model';
import { TransactionType } from './enums/TransactionType.model';
import { Transaction } from './transactions/transaction.model';
import { TransactionsComponent } from './transactions/transactions.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Economist';

  //Variable usada para guardar los datos de una transacción que va a ser editada
  editTransaction:Transaction = new Transaction('',TransactionType.Deposit,new Date(),'','','');
  modify:boolean = false;

  balanceText = 'El saldo de la cuenta es ';
  balance:number = 0;
  transactionsVolume:number = 0;
  amountSpend:number = 0;
  enteredAmount:number = 0;
  order:string = 'Fecha';
  orderDirection:string = 'desc';

  action:ActionWindow = ActionWindow.None;

  constructor() {}

  openOrderBy() {
    const orderBy = document.querySelector('.order-by');
    if (orderBy?.classList.contains('open')) {
      orderBy.classList.remove('open');
    } else {
      orderBy?.classList.add('open');
      setTimeout(function() {(<HTMLDivElement>orderBy).focus({preventScroll:false})},100);
    }
  }

  orderBy(event: Event, transactions:TransactionsComponent) {

    const previousOrder = document.querySelector('.asc,.desc');
    previousOrder?.classList.remove('asc','desc');
    
    const button = (<HTMLButtonElement>event.currentTarget);

    this.order = button.value;
    button.classList.add(this.orderDirection);
    this.orderDirection == 'asc' ? this.orderDirection = 'desc' : this.orderDirection = 'asc';
    
    this.listTransactions(transactions);
  }

  listTransactions(transactions:TransactionsComponent) {
    this.amountSpend = 0;
    this.enteredAmount = 0;
    this.setTransactionsVolume(0);

    transactions.getTransactions();
  }

  getAction():ActionWindow {
    return this.action;
  }

  openNewTransaction():void {
    this.action = ActionWindow.NewTransaction;
    this.editTransaction = new Transaction('',TransactionType.Deposit,new Date(),'','','');
    this.modify = false;
  }

  openEditTransaction(transaction:Transaction):void {
    
    this.action = ActionWindow.NewTransaction;
    this.editTransaction = transaction;
    this.modify = true;
  }

  openFilters():void {
    this.action = ActionWindow.Filters;
  }

  openImportWindow():void {
    this.action = ActionWindow.ImportWindow;
  }

  closeActionWindow():void {
    this.action = ActionWindow.None
  }

  //Getters
  getTransactionsVolume():number {
    return this.transactionsVolume;
  }
  getEnteredAmount():number {
    return this.enteredAmount;
  }
  getAmountSpend():number {
    return this.amountSpend;
  }
  //Setters
  setTransactionsVolume(transactionsVolume:number) {
    this.transactionsVolume = transactionsVolume;
  }
  setEnteredAmount(enteredAmount:number) {
    this.enteredAmount += enteredAmount;
  }
  setAmountSpend(amountSpend:number) {
    this.amountSpend += amountSpend;
  }
}
