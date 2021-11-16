import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-amount-selector',
  templateUrl: './amount-selector.component.html',
  styleUrls: ['./amount-selector.component.css']
})
export class AmountSelectorComponent implements OnInit {

  amount:string = "";

  adding:boolean = false;
  subtracting:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  writeAmount(key:KeyboardEvent) {
    if (key.key == "Backspace") {
      return;
    } else if (key.key == "," || key.key == ".") {
      this.amount += ',';
      return false;
    } else if (!key.key.match("[0-9]")) {

      return false;
    }
    return;

  }

  async addAmount() {
    this.adding = true;
    while (this.adding) {
      this.amount = (parseFloat(this.amount)+0.01).toString();
    }
  }

  async addUp() {
    this.adding = false;
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

}
