import { Component, Input, OnInit } from '@angular/core';
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

  @Input() transaction:Transaction = new Transaction('',TransactionType.Deposit,new Date(),'','','');

  @Input() modify:boolean = false;

  constructor(private transactionsService:TransactionsService) { }

  ngOnInit(): void {
    if (this.transaction.getType() == undefined) this.transaction.setType(TransactionType.Deposit);
  }

  newTransaction():void {
    if (this.transaction.getAmount() != '' && this.transaction.getConcept() != '' && this.transaction.getUser() != '') {
      var options:any = {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'};
      this.transaction.toDataBaseFormat();
      this.transactionsService.newTransaction(this.transaction).subscribe();
    } else {
      alert('Rellena todos los campos');
    }
  }
  
}
