import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user.model';
import * as data from '../../../settings.json';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl:string = "";

  constructor(private http: HttpClient) {
    const settings = data;
    this.apiUrl = settings.api_url;
  }

  registerUser(user:User) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    const body = JSON.stringify(user);
    return this.http.post(this.apiUrl+'/user',body,{headers});
  }

  getUser(user:User) {
    var params = new HttpParams()
    .set('username',user.getUsername())
    .set('password',user.getPassword())
    
    return this.http.get(this.apiUrl+'/user/check',{params});
  }

}
