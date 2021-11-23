import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TransactionType } from '../enums/TransactionType.model';

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

  adding:boolean = false;
  subtracting:boolean = false;
  generator:AsyncGenerator;

  constructor() { 

    async function* add(adding:boolean, amount:string) {
      while ((adding = yield adding)) {
        console.log(amount);
        amount = (parseFloat(amount)+0.01).toString();
        
        if(!adding) {
          return;
        }
      }
      return
    }

    this.generator = add(this.adding, this.amount);


  }

  ngOnInit(): void {

    

  }

  writeAmount(key:KeyboardEvent) {
    
    if (key.key == "," || key.key == ".") {
      this.amount += ',';
      return false;
    } else if (!key.key.match("[0-9]") && key.key != 'Backspace') {

      return false;
    }
    return;
  }

  sendAmount() {
    this.amountEmitter.emit(this.amount);
  }

  addAmount() {
    this.adding = true;
    this.generator.next(this.adding);
    
  }


  addUp() {
    this.adding = false;
    this.generator.next(this.adding);
  }

  async subtractAmount() {
    this.subtracting = true;
    while (this.subtracting) {
      this.amount = (parseFloat(this.amount)-0.01).toString();
    }
  }

  async subtractUp() {
    this.subtracting = false;
  }
  focusAmount() {

    document.getElementsByTagName('input')[0].focus();
  }

  getAdding() {
    return this.adding;
  }

}
