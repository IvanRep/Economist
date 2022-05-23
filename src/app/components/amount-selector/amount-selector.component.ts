import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TransactionType } from '../../enums/TransactionType.model';

@Component({
  selector: 'app-amount-selector',
  templateUrl: './amount-selector.component.html',
  styleUrls: ['./amount-selector.component.css']
})
export class AmountSelectorComponent implements OnInit {

  @Output() amountEmitter = new EventEmitter<string>(); 
  @Input() amount:string = "";
  @Input() label:string = '';
  @Input() small:boolean = false;
  @Input() type:string = TransactionType.Other;
  transactionType = TransactionType;


  constructor() { 
  }

  ngOnInit(): void {

  }

  inputAmount(input:string) {
    
    this.amountEmitter.emit(input);
  }

  addAmount(input:HTMLInputElement) {
    input.stepUp();
  }

  subtractAmount(input:HTMLInputElement) {
    input.stepDown();
  }

  focusAmount() {

    document.getElementsByTagName('input')[0].focus();
  }

}
