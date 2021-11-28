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
  editTransaction:Transaction = new Transaction();
  backupTransaction:Transaction = new Transaction();
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
    this.orderDirection == 'asc' ? this.orderDirection = 'desc' : this.orderDirection = 'asc';
    button.classList.add(this.orderDirection);
    
    this.listTransactions(transactions);
  }

  listTransactions(transactions:TransactionsComponent) {
    this.amountSpend = 0;
    this.enteredAmount = 0;
    this.setTransactionsVolume(0);

    transactions.getTransactions(this.order,this.orderDirection);
  }

  restoreTransaction() {

    if (this.action == ActionWindow.NewTransaction && this.modify == true) this.action = ActionWindow.None;

    this.editTransaction.setId(this.backupTransaction.getId());
    this.editTransaction.setType(this.backupTransaction.getType());
    this.editTransaction.setDate(this.backupTransaction.getDate());
    this.editTransaction.setConcept(this.backupTransaction.getConcept());
    this.editTransaction.setUser(this.backupTransaction.getUser());
    this.editTransaction.setAmount(this.backupTransaction.getAmount());
  } 

  getAction():ActionWindow {
    return this.action;
  }

  openNewTransaction():void {
    if (this.action != ActionWindow.NewTransaction) {
      this.restoreTransaction();
      this.action = ActionWindow.NewTransaction;
      this.modify = false;
    } else {
      this.action = ActionWindow.None;
    }

    this.editTransaction = new Transaction();
    
  }

  openEditTransaction(transaction:Transaction):void {
    
    this.action = ActionWindow.NewTransaction;
    this.editTransaction = transaction;
    this.backupTransaction = new Transaction(transaction.getId(),transaction.getType(),transaction.getDate(),transaction.getConcept(),transaction.getUser(),transaction.getAmount());
    this.modify = true;
  }

  openFilters():void {
    if (this.action != ActionWindow.Filters) {
      this.restoreTransaction();
      this.action = ActionWindow.Filters;
    } else {
      this.action = ActionWindow.None;
    }
   
  }

  openImportWindow():void {
    if (this.action != ActionWindow.ImportWindow) this.action = ActionWindow.ImportWindow;
    else this.action = ActionWindow.None;
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
