import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TransactionType } from '../enums/TransactionType.model';
import { TransactionsService } from '../transactions.service';
import { Transaction } from './transaction.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  title:string;
  transactions:Transaction[];
  error:any = '';

  @Output() transactionsVolumeEmitter = new EventEmitter<number>();
  @Output() enteredAmountEmitter = new EventEmitter<number>();
  @Output() amountSpendEmitter = new EventEmitter<number>();

  @Input() order = 'date';
  @Input() orderDirection = 'asc';
  constructor(private transactionsService:TransactionsService) { 
    this.title = 'Transacciones Realizadas';
    this.transactions = [
    ];

    this.getTransactions();
  }

  getTransactions() {
    this.transactions = [];
    this.transactionsService.getTransactionsID().subscribe(result => this.createTransactions(result));
  }

  createTransactions(ids:any) {
    for (let id of ids) {
      this.transactions.push(new Transaction(id.id,TransactionType.All, '00/00/0000','concept','user',0));
    }
    this.emitTransactionsVolume(this.transactions.length);
  }

  setBalance(amount:number) {
    if (amount>0) {
      this.emitEnteredAmount(amount);
    } else {
      this.emitAmountSpend(Math.abs(amount));
    }

  }

  emitTransactionsVolume(volume:number) {
    this.transactionsVolumeEmitter.emit(volume);
  }

  emitEnteredAmount(amount:number) {
    this.enteredAmountEmitter.emit(amount);
  }

  emitAmountSpend(amount:number) {
    this.amountSpendEmitter.emit(amount);
  }

  ngOnInit(): void {
  }

}
