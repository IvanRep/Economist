import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TransactionType } from '../enums/TransactionType.model';
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

  constructor(private transactionsService:TransactionsService) { }

  ngOnInit(): void {
    if (this.transaction.getType() == undefined) this.transaction.setType(TransactionType.Deposit);
  }

  confirmTransaction():void {
    if (this.transaction.getAmount() != '' && this.transaction.getConcept() != '' && this.transaction.getUser() != '') {
      if (this.modify) {
        this.transactionsService.updateTransaction(this.transaction.clone()).subscribe(() => this.updateTransaction());
      } else {
        this.transactionsService.newTransaction(this.transaction.clone()).subscribe(() => this.newTransaction());
      }
      
      
    } else {
      alert('Rellena todos los campos');
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
