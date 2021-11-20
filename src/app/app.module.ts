import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EditTransactionComponent } from './edit-transaction/edit-transaction.component';
import { FiltersComponent } from './filters/filters.component';
import { ImportWindowComponent } from './import-window/import-window.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionsBalanceComponent } from './transactions-balance/transactions-balance.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TypeSelectorComponent } from './type-selector/type-selector.component';
import { AmountSelectorComponent } from './amount-selector/amount-selector.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    EditTransactionComponent,
    FiltersComponent,
    ImportWindowComponent,
    TransactionsBalanceComponent,
    TransactionsComponent,
    TransactionComponent,
    TypeSelectorComponent,
    AmountSelectorComponent,
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, BsDatepickerModule.forRoot(), BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
