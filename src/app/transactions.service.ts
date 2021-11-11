import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

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
