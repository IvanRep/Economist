import { Component, OnInit } from '@angular/core';
import { PopUpWindow } from '../popup-window/popup-window.model';
import { TransactionsService } from '../transactions.service';

@Component({
  selector: 'app-import-window',
  templateUrl: './import-window.component.html',
  styleUrls: ['./import-window.component.css']
})
export class ImportWindowComponent implements OnInit {

  backups:any = [];

  constructor(private transactionsService:TransactionsService) { }

  ngOnInit(): void {
    this.listBackups();
  }

  listBackups() {
    this.transactionsService.listBackups().subscribe(result => this.backups = result);
  }
  
  import(filename:string) {

    const popup = new PopUpWindow('Importar Copia de Seguridad','¿Esta seguro de que quiere restaurar la copia de seguridad '+filename+'?', 
    () => {
      this.transactionsService.exportDatabase().subscribe();
      this.transactionsService.importDatabase(filename+'.sql').subscribe();
    });

    popup.printWindow();

    
  }
}
