import { Component, Input } from '@angular/core';
import { ActionWindow } from '../../enums/ActionWindow.model';
import { TransactionType } from '../../enums/TransactionType.model';
import { PopUpWindow } from '../../components/popup-window/popup-window.model';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { Transaction } from '../../model/transaction.model';
import { TransactionsComponent } from '../../components/transactions/transactions.component';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-economist-app',
  templateUrl: './economist-app.component.html',
  styleUrls: ['./economist-app.component.css']
})
export class EconomistAppComponent {
  title = 'Economist';

  @Input() appUser:User = new User('default', 'default');
  //Variable usada para guardar los datos de una transacción que va a ser editada
  editTransaction:Transaction = new Transaction(this.appUser);
  backupTransaction:Transaction = new Transaction(this.appUser);
  modify:boolean = false;

  balanceText = 'El saldo de la cuenta es ';
  balance:number = 0;
  transactionsVolume:number = 0;
  amountSpend:number = 0;
  enteredAmount:number = 0;
  order:string = 'date';
  orderDirection:string = 'desc';

  action:ActionWindow = ActionWindow.None;

  datetime = '';

  constructor(private transactionService: TransactionsService) {}

  ngOnInit() {
    this.startTime();
    document.addEventListener('keydown', (event) => {this.checkShortcuts(event)}, false)

  }
  /**
   * 
   * @param event 
   * Recibe un evento del teclado y comprueba si es un atajo rápido para algun evento
   */
  checkShortcuts(event:KeyboardEvent) {
    
    //Si hay una ventana emergente, sale de la función sin hacer nada
     const popup = (<HTMLDivElement>document.querySelector('div.pop-up-container'));
     if (popup) {
       return;
     }

    if (event.altKey && event.key == 'n') {
      this.openNewTransaction();
    }
    if ((event.altKey || event.ctrlKey) && event.key == 'f') {
      event.preventDefault();
      event.stopPropagation();
      this.openFilters();
    }
    if ((event.altKey || event.ctrlKey) && event.key == 'o') {
      event.preventDefault();
      event.stopPropagation();
      this.openOrderBy();
    }
  }

  export() {

    this.transactionService.exportDatabase().subscribe(result => this.exportDialog(result));

  }

  exportDialog(file:any) {

    const exportDocument = () => {
      const element = document.createElement('a');
      element.setAttribute('href','EconomistAPI/backup/'+file.toString().trim());
      element.setAttribute('download', file);
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }

    const popup = new PopUpWindow('Transacciones Exportadas','¿Quieres guardar una copia en tu ordenador?', exportDocument);
    popup.printWindow();
  }

  /**
   * Despliega los botones que sirven para modificar el orden de las transacciones
   */
  openOrderBy() {
    const orderBy = document.querySelector('.order-by');
    if (orderBy?.classList.contains('open')) {
      orderBy.classList.remove('open');
    } else {
      orderBy?.classList.add('open');
    }
  }

  /**
   * 
   * @param event 
   * @param transactions
   * Modifica la columna por la que son ordenadas las transacciones dependiendo del botón que se haya pulsado, luego vuelve a listar las transacciones
   */
  orderBy(event: Event, transactions:TransactionsComponent) {
    
    (<HTMLButtonElement>document.querySelector('.order-by>button:disabled')).disabled = false; //Vuelvo ha habilitar el anterior boton seleccionado

    const openOrderButton = document.querySelector('button.open_order');
    const button = (<HTMLButtonElement>event.currentTarget);

    this.order = button.value;
    
     //Cambio el icono que tiene el boton open_order por el del boton seleccionado y lo deshabilito 
    (<HTMLButtonElement>openOrderButton).innerHTML = button.innerHTML;
    button.disabled = true;

    this.listTransactions(transactions);
  }

  /**
   * 
   * @param transactions 
   * Lista las transacciones
   */
  listTransactions(transactions:TransactionsComponent) {
    this.amountSpend = 0;
    this.enteredAmount = 0;
    this.setTransactionsVolume(0);

    transactions.getTransactions(this.order,this.orderDirection);
  }

  /**
   * Restaura los datos de la transaccion que se esta editando (editTransaction) con los datos guardados en backupTransaction
   */
  restoreTransaction() {

    if (this.action == ActionWindow.NewTransaction && this.modify == true) this.action = ActionWindow.None;

    this.editTransaction.setId(this.backupTransaction.getId());
    this.editTransaction.setType(this.backupTransaction.getType());
    this.editTransaction.setDate(this.backupTransaction.getDate(), true);
    this.editTransaction.setConcept(this.backupTransaction.getConcept());
    this.editTransaction.setUser(this.backupTransaction.getUser());
    this.editTransaction.setAmount(this.backupTransaction.getAmount());
  }

  updateTransaction(amount:number) {

    //Quito del balance total el importe de la transacción que has sido modificada
    this.backupTransaction.getType() == TransactionType.Deposit ? this.setEnteredAmount(-this.backupTransaction.getAmount()) : this.setAmountSpend(-this.backupTransaction.getAmount());
    //Añado el nuevo importe al balance
    amount>0 ? this.setEnteredAmount(amount) : this.setAmountSpend(-amount);

    //Cambio el backup a la nueva transacción que se esta modificando
    this.backupTransaction = new Transaction(this.appUser,this.editTransaction.getId(),this.editTransaction.getType(),this.editTransaction.getDate(),this.editTransaction.getConcept(),this.editTransaction.getUser(),this.editTransaction.getAmount());
    this.action = ActionWindow.None;  
  }

  /**
   *   Abre la ventana para insertar nuevas transacciones
   */
  openNewTransaction():void {
    if (this.action != ActionWindow.NewTransaction) {
      this.action = ActionWindow.NewTransaction;
      this.modify = false;
    } else {
      this.action = ActionWindow.None;
    }

    //Reseteo la transacción a editar y el backup por si se ha seleccionado alguna
    this.editTransaction = new Transaction(this.appUser);
    this.backupTransaction = new Transaction(this.appUser);
    
  }

  /**
   * 
   * @param transaction 
   * Abre la ventana para modificar una transacción que recibe como parametro
   * 
   */
  openEditTransaction(transaction:Transaction):void {
    
    this.action = ActionWindow.NewTransaction;
    this.editTransaction = transaction;
    this.backupTransaction = new Transaction(this.appUser,transaction.getId(),transaction.getType(),transaction.getDate(),transaction.getConcept(),transaction.getUser(),transaction.getAmount());
    this.modify = true;
  }

  /**
   * Abre la ventana para controlar los filtros que actuan sobre las transacciones
   */
  openFilters():void {
    if (this.action != ActionWindow.Filters) {
      this.restoreTransaction();
      this.action = ActionWindow.Filters;
    } else {
      this.action = ActionWindow.None;
    }
   
  }

  /**
   * Abre la ventana para restaurar los datos de la bd desde un archivo sql
   */
  openImportWindow():void {
    if (this.action != ActionWindow.ImportWindow) this.action = ActionWindow.ImportWindow;
    else this.action = ActionWindow.None;
  }

  /**
   * Metodo para cerrar la ventana de acción (Vuelve al estado por defecto de la página)
   */
  closeActionWindow():void {
    this.action = ActionWindow.None
  }


  startTime() {

    const date = new Date();
    let hours = this.checkTime(date.getHours());
    let minutes = this.checkTime(date.getMinutes());
    let seconds = this.checkTime(date.getSeconds());

    this.datetime = hours + ':' + minutes + ':' + seconds;

    setTimeout(() => {this.startTime()}, 1000);
  }

  checkTime(number:number):string {

    if (number<=9) {
      return '0' + number;
    }
    return number.toString();
    

  }


  //Getters
  getAction():ActionWindow {
    return this.action;
  }
  getTransactionsVolume():number {
    return this.transactionsVolume;
  }
  getEnteredAmount():number {
    return this.enteredAmount;
  }
  getAmountSpend():number {
    return this.amountSpend;
  }
  //Setters
  setTransactionsVolume(transactionsVolume:number) {
    this.transactionsVolume = transactionsVolume;
  }
  setEnteredAmount(enteredAmount:number) {
    this.enteredAmount += enteredAmount;
  }
  setAmountSpend(amountSpend:number) {
    this.amountSpend += amountSpend;
  }
  setOrderDirection(transactions:TransactionsComponent) {
    const previousOrder = document.querySelector('.asc,.desc');
    previousOrder?.classList.remove('asc','desc');

    const orderButton = document.querySelector('header>div>button:last-child');
    if (this.orderDirection == "asc") {
      orderButton?.classList.add("desc");
    } else {
      orderButton?.classList.add("asc");
    }
    this.orderDirection == "asc" ? this.orderDirection = "desc" : this.orderDirection = "asc";

    this.listTransactions(transactions);
  }
}
