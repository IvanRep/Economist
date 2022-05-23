import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewRef } from '@angular/core';
import { User } from '../../model/User.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error:string = '';

  @ViewChild('user') username!:ElementRef;
  @ViewChild('password') password!:ElementRef;

  @Output() loginEmitter:EventEmitter<User> = new EventEmitter<User>();
  @Output() registerEmitter:EventEmitter<User> = new EventEmitter<User>(); 

  constructor() { }

  ngOnInit(): void {
  }

    /**
   * Gets the user data from the form inputs, hash the password and saves them in localStorage  
   */
  saveUser() {
    const username = (<HTMLInputElement>this.username.nativeElement).value;
    
    if (username.includes('"') || username.includes("'")) {
      return -1;
    }

    const password = (<HTMLInputElement>this.password.nativeElement).value;

    if (password.includes('"') || password.includes("'")) {
      return -2;
    }

    const user = new User(username, password);
    user.hashPassword();

    localStorage.setItem('user',JSON.stringify(user));

    return user;
  }

  /**
   * Gets the user data from the form inputs (hash the password), saves them in localStorage 
   * and sends an event whith the user to log in. 
   */
  logIn() {
    const user = this.saveUser();
    if (user === -1) {
      this.error = "El nombre de usuario contiene carácteres inválidos";
      return;
    }
    if (user === -2) {
      this.error = "La contraseña contiene carácteres inválidos";
      return;
    }
    this.loginEmitter.emit(user);
  }

    /**
   * Gets the user data from the form inputs (hash the password), saves them in localStorage 
   * and sends an event whith the user to register him. 
   */
  register() {
    const user = this.saveUser();
    if (user === -1) {
      this.error = "El nombre de usuario contiene carácteres inválidos";
      return;
    }
    if (user === -2) {
      this.error = "La contraseña contiene carácteres inválidos";
      return;
    }
    this.registerEmitter.emit(user);
  }

}
