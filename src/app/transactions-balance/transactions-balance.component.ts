import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionWindow } from '../enums/ActionWindow.model';

@Component({
  selector: 'app-transactions-balance',
  templateUrl: './transactions-balance.component.html',
  styleUrls: ['./transactions-balance.component.css']
})
export class TransactionsBalanceComponent implements OnInit {

  @Input() balance:number;
  @Input() transactionsVolume:number;
  @Input() enteredAmount:number;
  @Input() amountSpend:number;

  spreaded:boolean;
  @Input() action = ActionWindow.None;
  @Output() openFilters = new EventEmitter<boolean>();

  constructor() { 
    this.balance = 0.00;
    this.transactionsVolume = 0;
    this.enteredAmount = 0;
    this.amountSpend = 0;

    this.spreaded = true;
  }

  ngOnInit(): void {
  }

  onOpenFilters() {
    this.openFilters.emit(true);
  }

  getBalance():string {
    return Intl.NumberFormat('es', {maximumFractionDigits: 2}).format(this.balance);
  }
  setBalance(balance:number):void {
    this.balance = balance;
  }
  getTransactionsVolume():number {
    return this.transactionsVolume;
  }
  setTransactionsVolume(transactionsVolume:number):void {
    this.transactionsVolume = transactionsVolume;
  }
  getEnteredAmount() {
    return Intl.NumberFormat('es', {maximumFractionDigits: 2}).format(this.enteredAmount);
  }
  setEnteredAmount(enteredAmount:number):void {
    this.enteredAmount = enteredAmount;
  }
  getAmountSpend() {
    return Intl.NumberFormat('es', {maximumFractionDigits: 2}).format(this.amountSpend);
  }
  setAmountSpend(amountSpend:number):void {
    this.amountSpend = amountSpend;
  }
}
