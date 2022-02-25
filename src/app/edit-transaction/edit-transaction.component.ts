import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TransactionType } from '../enums/TransactionType.model';
import { PopUpWindow } from '../popup-window/popup-window.model';
import { TransactionsService } from '../transactions.service';
import { Transaction } from '../transactions/transaction.model';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css']
})
export class EditTransactionComponent implements OnInit {

  transactionType = TransactionType;
  @Output() listTransactionsEmitter:EventEmitter<void> = new EventEmitter<void>();
  @Output() updateTransactionEmitter:EventEmitter<number> = new EventEmitter<number>();

  @Input() transaction:Transaction = new Transaction();

  @Input() modify:boolean = false;
  backupDate:Date = new Date();

  constructor(private transactionsService:TransactionsService) { }

  ngOnInit(): void {
    if (this.transaction.getType() == undefined) this.transaction.setType(TransactionType.Deposit);

    if (this.modify) {
      this.backupDate = new Date(this.transaction.getDate());
    }
  }

  confirmTransaction():void {
    if (this.transaction.getAmount() != '' && this.transaction.getConcept() != '' && this.transaction.getUser() != '') {
      if (this.modify) {
        //Mantengo la hora antigua al modificar
        this.transaction.getDate().setHours(this.backupDate.getHours());
        this.transaction.getDate().setMinutes(this.backupDate.getMinutes());
        this.transaction.getDate().setSeconds(this.backupDate.getSeconds());

        this.transactionsService.updateTransaction(this.transaction.clone()).subscribe(() => this.updateTransaction(),() => this.updateTransaction());
      } else {
        this.transactionsService.newTransaction(this.transaction.clone()).subscribe(() => this.newTransaction(), () => this.newTransaction());
      }
      
      
    } else {
      const popup = new PopUpWindow("Rellena todos los campos",'Hay campos sin rellenar.',() => {},false); 
      popup.printWindow();
    }
  }

  newTransaction() {
    this.transaction.clear();
    this.listTransactionsEmitter.emit();
  }

  updateTransaction() {
    const amount = this.transaction.getType() == this.transactionType.Deposit ? this.transaction.getAmount() : -this.transaction.getAmount();

    this.updateTransactionEmitter.emit(amount);
  }

  
}
