import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TransactionType } from '../../enums/TransactionType.model';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css']
})
export class DateSelectorComponent implements OnInit {

  @Output() dateEmitter:EventEmitter<Date> = new EventEmitter<Date>();

  @Input() dateValue:any = '';
  @Input() label:string = '';

  @Input() type:string = TransactionType.Other;
  transactionType = TransactionType;

  constructor() { }

  ngOnInit(): void {
  }

  setDate(date:any) {
    const currentDate = new Date();
    date.setHours(currentDate.getHours());
    date.setMinutes(currentDate.getMinutes());
    date.setSeconds(currentDate.getSeconds());
    this.dateValue = date;

    this.dateEmitter.emit(date);
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


}
