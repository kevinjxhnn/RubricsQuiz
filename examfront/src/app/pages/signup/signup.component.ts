import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  constructor(
    private userService: UserService,
    private snack: MatSnackBar
    ){}

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',

  }

  ngOnInit(): void {}

  formSubmit(){
    console.log(this.user)
    if(this.user.username == '' || this.user.username == null){
      // alert('Please enter a valid username')
      this.snack.open("Please enter a valid username", 'Got it',{
        duration: 4000,
        verticalPosition: 'bottom',
      })
      return; //done to prevent the app from running further until rectified
    }


    //calling add user func from user service folder
    this.userService.addUser(this.user).subscribe(
      (data:any) => {
        //this runs when it is a success
        console.log(data)
        // alert("Success")
        Swal.fire("Success!", `${data.username} is registered, and your user id is ${data.id}`, "success")

      },
      (error) => {
        //this runs when it fails
        console.log(error);
        this.snack.open(error.error.text, 'Got it',{
          duration : 4000,
        })
        
      }
    )

  }

}
