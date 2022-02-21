import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filters } from './filters/filters.model';
import { Transaction } from './transactions/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private filters:Filters = new Filters();

  apiUrl = '';


  constructor(private http: HttpClient) { }

  /**
   * Obtiene un un objeto json con las opciones de configuración
   * 
   * @returns json con las opciones de configuración de la app
   */
  getApiUrl() {
    return this.http.get("settings.json",{responseType:"json"});
  }


  /**
   * Método utilizado para crear una nueva transacción en la base de datos
   * 
   * @param transaction (Transaction que se va a añadir a la base de datos)
   * 
   */
  newTransaction(transaction:Transaction) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    const body = JSON.stringify(transaction);
    return this.http.post(this.apiUrl+'/newTransaction.php',body,{headers, responseType: 'json'});
  }

  /**
   * Método utilizado para modificar los datos de una transacción en la base de datos
   * 
   * @param transaction (Transaction con los datos de la transacción que se va a modificar en la base de datos)
   * 
   */
  updateTransaction(transaction:Transaction) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    const body = JSON.stringify(transaction);
    return this.http.put(this.apiUrl+'/updateTransaction.php',body,{headers, responseType: 'json'});
  }
  /**
   * Método utilizado para eliminar una transacción de la base de datos
   * 
   * @param id (id de la transacción que se va a eliminar)
   * 
   */
  deleteTransaction(id:string) {
    return this.http.delete(this.apiUrl+'/deleteTransaction.php?id='+id);
  }

  /**
   * Devuelve el id de todas las transacciones de la base de datos
   * 
   * @param order (string indicando el campo por el cual se van a ordenar las transacciones)
   * @param orderDirection (string asc o desc indicando la dirección en la que se ordenaran las transacciones)
   * @returns {{'id': 1232},{'id': 1232}...}
   */
  getTransactionsID(order:string, orderDirection:string) {

    const jsonFilters = JSON.stringify(this.filters);
    
    return this.http.get(this.apiUrl+'/listarId.php?filters='+jsonFilters+'&order='+order+'&orderDirection='+orderDirection,{responseType: 'json'});
  }

 /**
   * Devuelve todos los datos de todas las transacciones de la base de datos
   * 
   * @param order (string indicando el campo por el cual se van a ordenar las transacciones)
   * @param orderDirection (string asc o desc indicando la dirección en la que se ordenaran las transacciones)
   * @returns {{'id': 2312,'type': '', 'date': '', 'amount': 1231, 'user': '', 'concept': ''},...}
   */
  getAllTransactions(order:string, orderDirection:string) {

    const jsonFilters = JSON.stringify(this.filters);
    
    return this.http.get(this.apiUrl+'/getAllTransactions.php?filters='+jsonFilters+'&order='+order+'&orderDirection='+orderDirection,{responseType: 'json'});
  }
  /**
   * Devuelve todos los datos de la transacción con el id que se pase como parametro
   * @param id (id de la transacción que se va a retornar)
   * @returns {'id': 2312,'tipo': '', 'fecha': '', 'importe': 1231, 'usuario': '', 'concepto': ''}
   */
  getTransaction(id:string) {

    return this.http.get(this.apiUrl+'/getTransaction.php?id='+id,{responseType: 'json'});
  }
  /**
   * Devueve un array con todos los nombres de las copias de seguridad
   * @returns {'string','string','string',...}
   */
  listBackups() {

    return this.http.get(this.apiUrl+'/listar_archivos.php',{responseType: 'json'});
  }
  /**
   * Listas todos los usuarios que hayan hehco una transacción con el tipo indicado y su nombre contenga el user pasado como parametro
   * @param user (string  con el texto que tiene que contener el nombre de los usuarios listados)
   * @param type (string con el tipo de la transacción en la que se quiere buscar a los usuarios)
   * @returns {'string','string',...}
   */
  getUsers(user:string, type:string) {

    return this.http.get(this.apiUrl+'/getUsers.php?user='+user+'&type='+type,{responseType: 'json'});
  }
  /**
   * Guarda una copia de seguridad con todos los datos de la base de datos en el servidor
   * 
   */
  exportDatabase() {

    return this.http.get(this.apiUrl+'/exportDatabase.php',{responseType: 'text' as const});
  }
  /**
   * Carga en la base de datos los datos del archivo de seguridad pasado como parametro
   * @param filename (string con el nombre del archivo que contiene la copia de seguridad)
   */
  importDatabase(filename:string) {
    return this.http.get(this.apiUrl+'/import.php?filename='+filename);
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
