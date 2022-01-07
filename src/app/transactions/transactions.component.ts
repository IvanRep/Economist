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

  @Output() restoreTransactionEmitter = new EventEmitter<void>();
  @Output() transactionsEmitter = new EventEmitter<Transaction>();
  @Output() transactionsVolumeEmitter = new EventEmitter<number>();
  @Output() enteredAmountEmitter = new EventEmitter<number>();
  @Output() amountSpendEmitter = new EventEmitter<number>();

  order = 'Fecha';
  orderDirection = 'desc';

  selectedTransaction = -1;
  controlKeyDown:boolean = false;

  constructor(private transactionsService:TransactionsService) { 
    this.title = 'Transacciones Realizadas';
    this.transactions = [
    ];

    this.getTransactions(this.order,this.orderDirection);
  }

  ngOnInit(): void {
    document.addEventListener('keydown',(event) => {this.keyDownEvent(event)}, false);

  }

  keyDownEvent(event:KeyboardEvent) {
    //Pulsar control
    if (event.ctrlKey) {
      this.controlKeyDown = true;
      event.preventDefault();
      event.stopPropagation();
    }

    //Mover hacia abajo
    if (event.ctrlKey && event.key == 's' || event.key == 'ArrowDown') {
      event.preventDefault();
      
      if (this.selectedTransaction >= 0 && this.selectedTransaction < this.transactions.length)
        this.transactions[this.selectedTransaction].setSelected(false);

      if ((this.selectedTransaction += 1) >= this.transactions.length) {
        this.selectedTransaction = 0;
      }
      // Revisión --------------------------------------------------------
      if (this.transactions[this.selectedTransaction].isSelected()) {
        this.transactions[this.selectedTransaction].setSelected(false);
      }
      setTimeout( () => {this.transactions[this.selectedTransaction].setSelected(true)});
      // -----------------------------------------------------------------
      setTimeout(() => {(<HTMLDivElement>document.querySelector('#transaction.selected')).focus({preventScroll:false})})

    }
    //Mover hacia arriba
    if (event.ctrlKey && event.key == 'a' || event.key == 'ArrowUp') {
      event.preventDefault();

      if (this.selectedTransaction >= 0 && this.selectedTransaction < this.transactions.length)
        this.transactions[this.selectedTransaction].setSelected(false);

      if ((this.selectedTransaction -= 1) < 0) {
        this.selectedTransaction = this.transactions.length-1;
      }
      // Revisión --------------------------------------------------------
      if (this.transactions[this.selectedTransaction].isSelected()) {
        this.transactions[this.selectedTransaction].setSelected(false);
      }
      setTimeout( () => {this.transactions[this.selectedTransaction].setSelected(true)});
      // -----------------------------------------------------------------
      setTimeout(() => {(<HTMLDivElement>document.querySelector('#transaction.selected')).focus({preventScroll:false})})
    }
    //Seleccionar transacción
    if (event.key == 'Enter' || event.key == 'e') {
      (<HTMLButtonElement>document.querySelector('.options.selected>button:first-of-type')).click();
    }
    /*if (event.key == 'Return') {
      (<HTMLButtonElement>document.querySelector('.options.selected>button:last-child')).click();
    }
    */
  }

  selectTransaction(transaction:Transaction) {
    for (let i = 0; i<this.transactions.length; i++) {
      if (this.transactions[i] == transaction) {
        this.selectedTransaction = i;
      }

    }
  }

  deleteTransaction(id:string) {
    for (let i = 0; i<this.transactions.length; i++) {
      if (this.transactions[i].getId() == id) {
        this.transactions.splice(i,1);
      }
    }
  }

  getTransactions(order:string = this.order, orderDirection:string = this.orderDirection) {
    this.transactions = [];
    this.order = order;
    this.orderDirection = orderDirection;
    //this.transactionsService.getTransactionsID(order, orderDirection).subscribe(result => this.createTransactions(result));
    this.transactionsService.getAllTransactions(order, orderDirection).subscribe(result => this.createTransactions(result));
  }

  createTransactions(result:any) {
    for (let transaction of result) {
      const dateSplitted = transaction.date.split("/");
      const date = new Date(parseInt(dateSplitted[2]),parseInt(dateSplitted[1])-1,parseInt(dateSplitted[0]));
      setTimeout(() => {
        this.transactions.push(new Transaction(transaction.id,transaction.type, date, transaction.concept, transaction.user, transaction.amount))
        this.emitTransactionsVolume(this.transactions.length);
      },100);
    }
    
  }

  setBalance(amount:number) {
    if (amount>0) {
      this.emitEnteredAmount(amount);
    } else {
      this.emitAmountSpend(Math.abs(amount));
    }

  }

  editTransaction(transaction:Transaction):void {
    this.transactionsEmitter.emit(transaction);
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

}
