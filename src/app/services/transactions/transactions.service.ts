import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { Filters } from '../../model/filters.model';
import { Transaction } from '../../model/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

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

    console.table(transaction);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    const body = JSON.stringify({transaction});
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
    const params = new HttpParams();
    params.append('username', this.user.getUsername());
    params.append('password', this.user.getPassword());
    const body = JSON.stringify(transaction);
    return this.http.put(this.apiUrl+'/trade',body,{params,headers, responseType: 'json'});
  }
  /** C
   * Método utilizado para eliminar una transacción de la base de datos
   * 
   * @param id (id de la transacción que se va a eliminar)
   * 
   */
  deleteTransaction(id:string) {
    const params = new HttpParams();
    params.append('username', this.user.getUsername());
    params.append('password', this.user.getPassword());
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

    const params = new HttpParams();
    params.append('username', this.user.getUsername());
    params.append('password', this.user.getPassword());
    params.append('min', this.filters.getMinimumAmount());
    params.append('max', this.filters.getMaximumAmount());
    params.append('since', this.filters.getSince());
    params.append('until', this.filters.getUntil());
    if (this.filters.getType() != 'Todos') params.append('type', this.filters.getType());
    params.append('user', this.filters.getUser());
    params.append('concept', this.filters.getConcept());
    params.append('orderBy', order);
    params.append('orderType', orderDirection);
    params.append('dateFormat', 'dd/MM/yyyy/HH/mm/ss');
    
    return this.http.get(this.apiUrl+'/trade',{params,responseType: 'json'});
  }

  /** C
   * Devuelve todos los datos de la transacción con el id que se pase como parametro
   * @param id (id de la transacción que se va a retornar)
   * @returns {'id': 2312,'type': '', 'date': '', 'amount': 1231, 'user': '', 'concept': ''}
   */
  getTransaction(id:string) {

    const params = new HttpParams();
    params.append('username', this.user.getUsername());
    params.append('password', this.user.getPassword());
    params.append('dateFormat', 'dd/MM/yyyy/HH/mm/ss');

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
   * Listas todos los usuarios que hayan hecho una transacción con el tipo indicado y su nombre contenga el user pasado como parametro
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

  setUser(user:User):void {
    this.user = user;
  }

  getUser():User {
    return this.user;
  }

}
