import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TransactionType } from '../../enums/TransactionType.model';

@Component({
  selector: 'app-type-selector',
  templateUrl: './type-selector.component.html',
  styleUrls: ['./type-selector.component.css']
})
export class TypeSelectorComponent implements OnInit {

  transactionType = TransactionType;
  @Input() all:boolean;
  @Input() type:string;
  @Output() typeEmitter = new EventEmitter<string>();


  constructor() {
    this.all = false;
    this.type = TransactionType.All;
  }

  ngOnInit(): void {
     if (this.type == undefined) {
      this.all ? this.type = TransactionType.All : this.type = TransactionType.Deposit;
     }
  }

  getType():string {
    return this.type.toString();
  }

  setType(type:TransactionType) {
    this.type = type;
    this.typeEmitter.emit(type);
  }

}
