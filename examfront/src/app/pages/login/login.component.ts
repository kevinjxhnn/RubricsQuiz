import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginData = {
    username: '',
    password: ''
  }

  constructor(private snack:MatSnackBar, private login:LoginService, private router:Router){}

  ngOnInit(): void {}

  formSubmit(){
    console.log("login button clicked")

    if(this.loginData.username.trim()=="" || this.loginData.username==null){
      {
        this.snack.open("Please enter a valid username", 'Got it',{
          duration: 4000,
          verticalPosition: 'bottom',
        })
        return; //done to prevent the app from running further until rectified
      }
    }

    if(this.loginData.password.trim()=="" || this.loginData.password==null){
      {
        this.snack.open("Password is required", 'Got it',{
          duration: 4000,
          verticalPosition: 'bottom',
        })
        return; 
      }
    }

    //sending req to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      //success
      (data:any)=>{
        console.log("success");
        console.log(data)

        /*logging in the user*/

        //saving the token generated and the user details  in the local storage
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          //success
          (user:any) => {
            this.login.setUser(user);
            console.log(user)
            

            if(this.login.getUserRole() == "ADMIN"){
              //redirect admin -> admin dashboard
              // window.location.href='/admin'
              this.router.navigate(['admin/categories'])
              this.login.loginStatusSubject.next(true)
              
            } else if (this.login.getUserRole() == "NORMAL"){
              //redirect normal -> normal dashboard
              // window.location.href='/user-dashboard'
              this.router.navigate(['user-dashboard/0'])
              this.login.loginStatusSubject.next(true)

            } else {
              this.login.logout();
            }


          });
      },

      //error
      (error)=>{
        console.log("Error ")
        console.log(error)
        this.snack.open("Invalid credentials, please try again", "Got it", {
          duration: 4000,

        })
      }
    )

  }

}
