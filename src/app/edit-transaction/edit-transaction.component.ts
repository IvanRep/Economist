import { Component, OnInit } from '@angular/core';
import { TransactionType } from '../enums/TransactionType.model';
import { TransactionsService } from '../transactions.service';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css']
})
export class EditTransactionComponent implements OnInit {

  private amount:string = '';
  private type:string = TransactionType.Deposit;
  private concept:string = '';
  private user:string = '';
  dateValue:Date = new Date();

  constructor(private transactionsService:TransactionsService) { }

  ngOnInit(): void {
  }

  newTransaction():void {
    if (this.amount != '' && this.concept != '' && this.user != '') {
      var options:any = {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'};
      var date:string = this.dateValue.toLocaleString('es-ES',options);
      this.transactionsService.newTransaction(date,this.type, this.concept, this.user, this.amount).subscribe();
    } else {
      alert('Rellena todos los campos');
      alert(this.user);
    }
  }

  getMonth():string {
    switch(this.dateValue.getMonth()) {
      case 0:
        return 'Enero';
      case 1:
        return 'Febrero';
      case 2:
        return 'Marzo';
      case 3:
        return 'Abril';
      case 4:
        return 'Mayo';
      case 5:
        return 'Junio';
      case 6:
        return 'Julio';
      case 7:
        return 'Agosto';
      case 8:
        return 'Septiembre';
      case 9:
        return 'Octubre';
      case 10:
        return 'Noviembre';
      case 11:
        return 'Diciembre';
      default:
        return 'Error';
    }
  }

  setAmount(amount:string):void {
    this.amount = amount;
  }
  
  setType(type:string):void {
    this.type = type;
  }

  setConcept(concept:string):void {
    this.concept = concept;
  }

  setUser(user:string):void {
    this.user = user;
  }
}
