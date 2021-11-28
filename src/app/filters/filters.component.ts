import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TransactionType } from '../enums/TransactionType.model';
import { TransactionsService } from '../transactions.service';
import { Filters } from './filters.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  @Output() listTransactionsEmitter:EventEmitter<void> = new EventEmitter<void>();

  contSince:number = 0;
  contUntil:number = 0;
  filters:Filters;

  transactionType = TransactionType;

  constructor(private transactionService:TransactionsService) { 
    this.filters = transactionService.getFilters();
  }

  ngOnInit(): void {
  }

  clearFilters() {
    this.transactionService.getFilters().clear();

    this.listTransactionsEmitter.emit();
  }

  setType(type:string):void {
    this.transactionService.getFilters().setType(type);

    this.listTransactionsEmitter.emit();
  }
  setMinimumAmount(minimumAmount:string):void {
    this.transactionService.getFilters().setMinumumAmount(parseFloat(minimumAmount));

    this.listTransactionsEmitter.emit();
  }
  setMaximumAmount(maximumAmount:string):void {
    this.transactionService.getFilters().setMaximumAmount(parseFloat(maximumAmount));

    this.listTransactionsEmitter.emit();
  }
  setSince(date:Date):void {
    this.contSince++;

    this.transactionService.getFilters().setSince(date);
    if (this.contSince>1)
      this.listTransactionsEmitter.emit();
  }
  setUntil(date:Date):void {
    this.contUntil++;

    this.transactionService.getFilters().setUntil(date);
    if (this.contUntil>1)
      this.listTransactionsEmitter.emit();
  }
  setConcept(concept:string):void {
    this.transactionService.getFilters().setConcept(concept);

    this.listTransactionsEmitter.emit();
  }
  setUser(user:string):void {
    this.filters.setUser(user);

    this.listTransactionsEmitter.emit();
  }

  //Getters
  getType() {
    return this.filters.getType();
  }
  getMinimumAmount():string {
    return this.filters.getMinimumAmount().toString();
  }
  getMaximumAmount():string {
    return this.filters.getMaximumAmount().toString();
  }
  getSince():Date {
    return this.filters.getSince();
  }
  getUntil():Date {
    return this.filters.getUntil();
  }
  getConcept():string {
    return this.filters.getConcept();
  }
  getUser():string {
    return this.filters.getUser();
  }

}
