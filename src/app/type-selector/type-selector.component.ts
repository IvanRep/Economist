import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TransactionType } from '../enums/TransactionType.model';

@Component({
  selector: 'app-type-selector',
  templateUrl: './type-selector.component.html',
  styleUrls: ['./type-selector.component.css']
})
export class TypeSelectorComponent implements OnInit {

  transactionType = TransactionType;

  type:TransactionType;

  @Output() typeEmitter = new EventEmitter<string>();

  constructor() { 
    this.type = TransactionType.Deposit;
  }

  ngOnInit(): void {
  }

  getType():string {
    return this.type.toString();
  }

  setType(type:TransactionType) {
    this.type = type;
    this.typeEmitter.emit(type);
  }

}
