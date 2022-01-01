import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filters } from './filters/filters.model';
import { Transaction } from './transactions/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private filters:Filters = new Filters();

  constructor(private http: HttpClient) { }

  newTransaction(transaction:Transaction) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    const body = JSON.stringify(transaction);
    return this.http.post('http://192.168.1.56/php/newTransaction.php',body,{headers, responseType: 'json'});
  }

  updateTransaction(transaction:Transaction) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    const body = JSON.stringify(transaction);
    return this.http.put('http://192.168.1.56/php/updateTransaction.php',body,{headers, responseType: 'json'});
  }

  deleteTransaction(id:string) {
    return this.http.delete('http://192.168.1.56/php/deleteTransaction.php?id='+id);
  }

  getTransactionsID(order:string, orderDirection:string) {

    const jsonFilters = JSON.stringify(this.filters);
    
    return this.http.get('http://192.168.1.56/php/listarId.php?filters='+jsonFilters+'&order='+order+'&orderDirection='+orderDirection,{responseType: 'json'});
  }

  getAllTransactions(order:string, orderDirection:string) {

    const jsonFilters = JSON.stringify(this.filters);
    
    return this.http.get('http://192.168.1.56/php/getAllTransactions.php?filters='+jsonFilters+'&order='+order+'&orderDirection='+orderDirection,{responseType: 'json'});
  }

  getTransaction(id:string) {

    return this.http.get('http://192.168.1.56/php/getTransaction.php?id='+id,{responseType: 'json'});
  }

  listBackups() {

    return this.http.get('http://192.168.1.56/php/listar_archivos.php',{responseType: 'json'});
  }

  getUsers(user:string, type:string) {

    return this.http.get('http://192.168.1.56/php/getUsers.php?user='+user+'&type='+type,{responseType: 'json'});
  }

  exportDatabase() {

    return this.http.get('http://192.168.1.56/php/exportDatabase.php',{responseType: 'json'});
  }



  //Setters
  setFilters(filters:Filters):void {
    this.filters = filters;
  }
  //Getters
  getFilters():Filters {
    return this.filters;
  }

}
