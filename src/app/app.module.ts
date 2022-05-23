import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EditTransactionComponent } from './components/edit-transaction/edit-transaction.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ImportWindowComponent } from './components/import-window/import-window.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { TransactionsBalanceComponent } from './components/transactions-balance/transactions-balance.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { TypeSelectorComponent } from './components/type-selector/type-selector.component';
import { AmountSelectorComponent } from './components/amount-selector/amount-selector.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateSelectorComponent } from './components/date-selector/date-selector.component';
import { UserSelectorComponent } from './components/user-selector/user-selector.component';
import { PopupWindowComponent } from './components/popup-window/popup-window.component';
import { EconomistAppComponent } from './pages/economist-app/economist-app.component';
import { LoginComponent } from './pages/login/login.component';

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
    DateSelectorComponent,
    UserSelectorComponent,
    PopupWindowComponent,
    EconomistAppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, BsDatepickerModule.forRoot(), BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
