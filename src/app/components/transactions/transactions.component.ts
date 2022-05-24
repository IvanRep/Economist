import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TransactionType } from '../../enums/TransactionType.model';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { Transaction } from '../../model/transaction.model';

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

  order = 'date';
  orderDirection = 'desc';

  selectedTransaction = -1;
  controlKeyDown:boolean = false;

  constructor(private transactionsService:TransactionsService) { 
    this.title = 'Transacciones Realizadas';
    this.transactions = [
    ];

    //Obtengo del fichero settings la url de la api y se la agrego al transactionService
    this.transactionsService.getApiUrl().subscribe( (settings:any) => {
      this.transactionsService.apiUrl = settings.api_url;

      //Listo todas las transacciones
      this.getTransactions(this.order,this.orderDirection);
    });
    
  }

  ngOnInit(): void {
    document.addEventListener('keydown',(event) => {this.keyDownEvent(event)}, false);

  }

  keyDownEvent(event:KeyboardEvent) { 
    
    //Si hay una ventana emergente, sale de la función sin hacer nada
    const popup = (<HTMLDivElement>document.querySelector('div.pop-up-container'));
    if (popup) {
      return;
    }

    //Mover hacia abajo
    if (event.altKey && event.key == 's' || event.key == 'ArrowDown') {
      event.preventDefault();
      event.stopPropagation();
      this.restoreTransactionEmitter.emit();

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
    if (event.altKey && event.key == 'w' || event.key == 'ArrowUp') {
      event.preventDefault();
      event.stopPropagation();
      this.restoreTransactionEmitter.emit();

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
    //Comprobar que haya una transacction seleccionada
    const selectedTransaction = (<HTMLDivElement>document.querySelector('#transaction.selected:focus'));
    if (!selectedTransaction)
      return;

    //Editar transacción
    if (event.key == 'Enter' || event.key == 'e') {
      (<HTMLButtonElement>document.querySelector('.options.selected>button:first-of-type'))?.click();
    }
    //Borrar transacción
    if (event.key == 'Backspace' || event.key == 'Delete') {
      (<HTMLButtonElement>document.querySelector('.options.selected>button:last-of-type'))?.click();
    }
    console.log(event.key);
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
      const date = new Date(parseInt(dateSplitted[2]),parseInt(dateSplitted[1])-1,parseInt(dateSplitted[0]),parseInt(dateSplitted[3]),parseInt(dateSplitted[4]),parseInt(dateSplitted[5]));
      setTimeout(() => {
        this.transactions.push(new Transaction(this.transactionsService.getUser(),transaction.id,transaction.type, date, transaction.concept, transaction.user, transaction.amount))
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
