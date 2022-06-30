import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewRef } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { User } from '../../model/user.model';

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

  constructor(private usersService:UsersService) { }

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

    try {
      console.table(user);
      this.usersService.getUser(user).subscribe(response => {
        this.loginEmitter.emit(user);

      });
    } catch(error) {
      console.table(error);
    }
  }

    /**
   * Gets the user data from the form inputs (hash the password), saves them in localStorage 
   * and sends an event whith the user to log in. 
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

    try {
      this.usersService.registerUser(user).subscribe(response => {

        this.loginEmitter.emit(user);
      });
    } catch(error) {
      console.table(error);
    }
  }

}
