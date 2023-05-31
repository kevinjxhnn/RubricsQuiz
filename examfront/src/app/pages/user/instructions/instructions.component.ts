import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit{

  qid:any
  quiz: any

  constructor(
    private _route : ActivatedRoute,
    private _quiz : QuizService,
    private _router : Router,

  ){}

  ngOnInit(): void {

    this.qid = this._route.snapshot.params['qid']

    this._quiz.getQuiz(this.qid).subscribe(

      (data:any) =>{
        this.quiz = data

      },

      (error)=>{
        Swal.fire('Server Error!', 'Quiz could not be loaded due to some internal error', 'error');
      }

    )
    
  }

  startQuiz(){
    Swal.fire({
      icon : 'info',
      title : 'Do you want to start the quiz?',
      confirmButtonText : 'Start',
      showCancelButton : true,

    }).then((result) =>{

      if(result.isConfirmed){
        this._router.navigate(['/start/' + this.qid])
      } 
    })

  }

}
