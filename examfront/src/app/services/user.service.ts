import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {}

  //adding user
  public addUser(user: any){
    //as configured in the java file
    return this.http.post(`${baseUrl}/user/`, user)
  }


}
