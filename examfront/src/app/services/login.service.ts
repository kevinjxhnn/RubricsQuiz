import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //all the components subscribed to this, as soon as the event is emitted, all the functions will be called
  public loginStatusSubject = new Subject<boolean>()

  constructor(private http: HttpClient) { }

  //gets all the details of the current user logged in
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`)
  }

  //generating token
  public generateToken(loginData:any){

    return this.http.post(`${baseUrl}/generate-token`, loginData)

  }

  //login user: this will set the token in the local storage
  public loginUser(token: string){
    localStorage.setItem("token", token)
    
    return true;
  }

  //func to check if the user is logged in or not
  public isLoggedIn(){

    let tokenStr=localStorage.getItem("token")

    if(tokenStr==undefined || tokenStr==''|| tokenStr==null){
      return false;

    } else {
      return true;
    }
  }

  //function to log out (removes the token from local storage)
  public logout(){
    
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  //func to get the token from local storage
  public getToken(){
    return localStorage.getItem("token");
  }


  //set user detail in the local storage so that we dont have to keep requesting backend
  public setUser(user:any){
    localStorage.setItem("user", JSON.stringify(user));
  }

  //func to get the user from local storage
  
  public getUser(){
    let userStr=localStorage.getItem('user');

    if(userStr != null){
      //if user is not null, parse in JSON and return
      return JSON.parse(userStr)

    } else {
      //log the user out
      this.logout();
      return null;

    }
  }

  //get the user authority(role)
  public getUserRole(){
    let user=this.getUser()
    
    return user.authorities[0].authority; 

  }


}
