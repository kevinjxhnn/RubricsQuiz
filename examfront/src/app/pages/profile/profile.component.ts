import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  user : any

  constructor(private login: LoginService){}

  //when it loads for intialiasing, angular calls this func
  ngOnInit(): void {
    this.user=this.login.getUser();

  }

  
}


