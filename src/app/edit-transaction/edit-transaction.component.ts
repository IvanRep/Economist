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
  @Output() updateTransactionEmitter:EventEmitter<string> = new EventEmitter<string>();

  @Input() transaction:Transaction = new Transaction();

  @Input() modify:boolean = false;

  constructor(private transactionsService:TransactionsService) { }

  ngOnInit(): void {
    if (this.transaction.getType() == undefined) this.transaction.setType(TransactionType.Deposit);
  }

  confirmTransaction():void {
    if (this.transaction.getAmount() != '' && this.transaction.getConcept() != '' && this.transaction.getUser() != '') {
      if (this.modify) {
        this.transactionsService.updateTransaction(this.transaction.clone()).subscribe(() => alert('Transacción Modificada'));
      } else {
        this.transactionsService.newTransaction(this.transaction.clone()).subscribe(() => this.newTransaction());
      }
      this.transaction.clear();
      
    } else {
      alert('Rellena todos los campos');
    }
  }

  newTransaction() {
    this.listTransactionsEmitter.emit();
  }

  updateTransaction(id:string) {
    this.updateTransactionEmitter.emit(id);
    alert('Transacción Modificada.');
  }

  
}
