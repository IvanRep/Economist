import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TransactionType } from '../../enums/TransactionType.model';
import { TransactionsService } from '../../services/transactions/transactions.service';

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.css']
})
export class UserSelectorComponent implements OnInit {

  constructor(private transactionService:TransactionsService) { }

  transactionType = TransactionType;

  @Input() user:string = '';
  @Input() type:string = '';
  @Output() userEmitter = new EventEmitter<string>();

  arrayUsers:string[] = new Array();

  ngOnInit(): void {
  }

  inputUser(user:string) {
    
    this.userEmitter.emit(user);
    this.autocompleteUsers(user);
    
  }
  autocompleteUsers(user:string) {
    this.transactionService.getUsers(user,this.type).subscribe(users => this.getUsers(users));
  }

  getUsers(users:any) {

    this.arrayUsers = users;

  }

}
