import { Component, OnInit } from '@angular/core';
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
}
