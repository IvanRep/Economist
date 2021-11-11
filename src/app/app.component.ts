import { Component } from '@angular/core';
import { ActionWindow } from './enums/ActionWindow.model';

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

  action:ActionWindow = ActionWindow.None;

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
