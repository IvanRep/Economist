import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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

  @ViewChild('userInput') userInput!:ElementRef;
  @ViewChild('userSuggestions') userSuggestions!:ElementRef;

  arrayUsers:Map<String,Set<String>> = new Map();
  displayedUsers:Set<String> = new Set<String>();
  deployed:boolean = false;

  ngOnInit(): void {
    this.getAllUsers();

    //Creo un event listener para comprobar si se pulsa el enter en una sugerencia del cuadro de sugerencias
    document.addEventListener('keyup', (event:KeyboardEvent) => {
      if (this.deployed && event.key == 'Enter') { //SI el cuadro de sugerencias esta abierto y se pulsa enter simulo un click
        if (document.activeElement) {
          const focusedElement = (<HTMLLIElement>document.activeElement);
          focusedElement.click();
        } 
      }
    });

  }

  inputUser(user:string) {
    
    this.userEmitter.emit(user);

    if (user.length === 0) {
      this.displayedUsers.clear();
      this.deployed = false;
      return;
    }

    this.autocompleteUsers(user);
    
  }

  autocompleteUsers(user:string) {
    this.displayedUsers = new Set();
    this.arrayUsers.get(this.type)?.forEach((value) => {

      if (value.toLowerCase().startsWith(user.toLowerCase())) {
        this.displayedUsers.add(value);
      }
    });
    if (this.displayedUsers.size > 0)
      this.deployed = true;
    (<HTMLDivElement>this.userSuggestions.nativeElement).style.top = (<HTMLInputElement>this.userInput.nativeElement).getBoundingClientRect().bottom + "px";
    (<HTMLDivElement>this.userSuggestions.nativeElement).style.width = (<HTMLInputElement>this.userInput.nativeElement).getBoundingClientRect().width + "px";
  }

  getAllUsers() {
    this.arrayUsers.clear();
    this.arrayUsers.set(this.transactionType.All, new Set());
    this.transactionService.transactions.forEach((transaction) => {
      if (!this.arrayUsers.has(transaction.getType())) {
        this.arrayUsers.set(transaction.getType(), new Set());
      }

      this.arrayUsers.get(this.transactionType.All)?.add(transaction.user);
      this.arrayUsers.get(transaction.getType())?.add(transaction.user);
    });
  }

  setSuggestion(suggestion:String) {
    (<HTMLInputElement>this.userInput.nativeElement).value = suggestion.toString();
    this.userEmitter.emit(suggestion.toString());
    this.deployed = false;
  }

  hideSuggestions() {
    setTimeout(() => {
      const focusedElement = (<HTMLDivElement>this.userSuggestions.nativeElement).querySelector('ul li:focus')
      if (focusedElement)
        return;
      this.deployed = false
    });
  }

}
