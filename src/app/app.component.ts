import { Component } from '@angular/core';
import { ActionWindow } from './enums/ActionWindow.model';
import { TransactionType } from './enums/TransactionType.model';
import { PopUpWindow } from './components/popup-window/popup-window.model';
import { TransactionsService } from './services/transactions/transactions.service';
import { Transaction } from './model/transaction.model';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { User } from './model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Economist';

  user!:User;

  constructor(private transactionService: TransactionsService) {}

  ngOnInit() {
    let savedUser:any = localStorage.getItem('user');
    if (!savedUser)
      return
    
    savedUser = JSON.parse(savedUser);
    this.user = new User(savedUser.username,savedUser.password,savedUser.type);
    this.transactionService.setUser(this.user);

  }

  logIn(user:User) {

    this.user = user;
    this.transactionService.setUser(user);
    localStorage.setItem('user',JSON.stringify(user));

  }

}
