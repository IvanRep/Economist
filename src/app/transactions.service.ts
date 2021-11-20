import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  newTransaction(date:string, type:string, concept:string, user:string, amount:string) {
    const headers = { 'content-type': 'application/json'};
    const body = {date: date, type:type, concept:concept, user:user, amount:amount};
    console.log(body)
    return this.http.post('http://192.168.1.56/php/newTransaction.php',body,{'headers': headers});
  }

  getTransactionsID() {
    
    return this.http.get('http://192.168.1.56/php/listarId.php',{responseType: 'json'});
  }

  getTransaction(id:string) {

    return this.http.get('http://192.168.1.56/php/getTransaction.php?id='+id,{responseType: 'json'});
  }

  listBackups() {

    return this.http.get('http://192.168.1.56/php/listar_archivos.php',{responseType: 'json'});
  }

}
