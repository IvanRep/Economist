import { Component } from '@angular/core';
import { ActionWindow } from './enums/ActionWindow.model';
import { TransactionsComponent } from './transactions/transactions.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Economist';

  balanceText = 'El saldo de la cuenta es ';
  balance:number = 0;
  transactionsVolume:number = 0;
  amountSpend:number = 0;
  enteredAmount:number = 0;
  order:string = 'date';
  orderDirection:string = 'asc';

  action:ActionWindow = ActionWindow.None;

  openOrderBy() {
    const orderBy = document.querySelector('.order-by');
    if (orderBy?.classList.contains('open')) {
      orderBy.classList.remove('open');
    } else {
      orderBy?.classList.add('open');
    }
  }

  orderBy(order: string, transactions:TransactionsComponent) {
    switch(order) {
      case 'date':
        this.order = 'date';
        break;

      case 'type':
        this.order = 'type';
        break;
      case 'amount':
        this.order = 'amount';
        break;
      case 'user':
        this.order = 'user';
        break;
    }

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
