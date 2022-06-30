import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { Filters } from '../../model/filters.model';
import { Transaction } from '../../model/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  transactions:Transaction[] = [];

  private user:User = new User('default', 'default');
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

  /** C
   * Método utilizado para crear una nueva transacción en la base de datos
   * 
   * @param transaction (Transaction que se va a añadir a la base de datos)
   * 
   */
  newTransaction(transaction:Transaction) {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    const transactionClone = transaction.clone();
    transactionClone.normalizeDate();
    const body = JSON.stringify([transactionClone]);
    console.table(body);
    return this.http.post(this.apiUrl+'/trade',body,{headers, responseType: 'json'});
  }

  /** C
   * Método utilizado para modificar los datos de una transacción en la base de datos
   * 
   * @param transaction (Transaction con los datos de la transacción que se va a modificar en la base de datos)
   * 
   */
  updateTransaction(transaction:Transaction) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    const params = new HttpParams()
    .set('username', this.user.getUsername())
    .set('password', this.user.getPassword());

    const transactionClone = transaction.clone();
    transactionClone.normalizeDate();
    const body = JSON.stringify([transactionClone]);
    return this.http.put(this.apiUrl+'/trade',body,{params,headers, responseType: 'json'});
  }
  /** C
   * Método utilizado para eliminar una transacción de la base de datos
   * 
   * @param id (id de la transacción que se va a eliminar)
   * 
   */
  deleteTransaction(id:string) {
    const params = new HttpParams()
    .set('username', this.user.getUsername())
    .set('password', this.user.getPassword())
    return this.http.delete(this.apiUrl+'/trade/'+id,{params});
  }

  /**
   * UNUSED
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

 /** C
   * Devuelve todos los datos de todas las transacciones de la base de datos
   * 
   * @param order (string indicando el campo por el cual se van a ordenar las transacciones)
   * @param orderDirection (string asc o desc indicando la dirección en la que se ordenaran las transacciones)
   * @returns {{'id': 2312,'type': '', 'date': '', 'amount': 1231, 'user': '', 'concept': ''},...}
   */
  getAllTransactions(order:string, orderDirection:string) {
    
    const params = new HttpParams()
    .set('username', this.user.getUsername())
    .set('password', this.user.getPassword())
    .set('min', this.filters.getMinimumAmount())
    .set('max', this.filters.getMaximumAmount())
    .set('since', this.filters.getFormattedSince())
    .set('until', this.filters.getFormattedUntil())
    .set('user', this.filters.getUser())
    .set('concept', this.filters.getConcept())
    .set('orderBy', order)
    .set('orderType', orderDirection)
    .set('dateFormat', 'dd/MM/yyyy/HH/mm/ss')
    .set('type', this.filters.getType() != 'Todos' ? this.filters.getType() : '');
    console.log(this.user.getPassword())
    return this.http.get(this.apiUrl+'/trade',{params,responseType: 'json'});
  }

  /** C
   * Devuelve todos los datos de la transacción con el id que se pase como parametro
   * @param id (id de la transacción que se va a retornar)
   * @returns {'id': 2312,'type': '', 'date': '', 'amount': 1231, 'user': '', 'concept': ''}
   */
  getTransaction(id:string) {

    const params = new HttpParams()
    .set('username', this.user.getUsername())
    .set('password', this.user.getPassword())
    .set('dateFormat', 'dd/MM/yyyy/HH/mm/ss')

    return this.http.get(this.apiUrl+'/trade/'+id,{params,responseType: 'json'});
  }
  /**
   * Devueve un array con todos los nombres de las copias de seguridad
   * @returns {'string','string','string',...}
   */
  listBackups() {

    return this.http.get(this.apiUrl+'/listar_archivos.php',{responseType: 'json'});
  }
  /**
   * @param field 
   * @returns {'string','string',...}
   */
  getSuggest(field:string) {
    const params = new HttpParams()
    .set('username', this.user.getUsername())
    .set('password', this.user.getPassword())
    .set('field', field)
    return this.http.get(this.apiUrl+'/trade/suggest',{params,responseType: 'json'});
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

  setUser(user:User):void {
    this.user = user;
  }

  getUser():User {
    return this.user;
  }

}
