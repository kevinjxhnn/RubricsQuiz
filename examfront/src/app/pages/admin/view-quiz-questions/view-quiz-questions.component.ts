import { QuestionService } from './../../../services/question.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit{

  qid : any;
  qTitle : any;

  questions! : any[];


  constructor(
    private _route : ActivatedRoute,
    private _question: QuestionService
  ){}

  ngOnInit(): void {

    this.qid = this._route.snapshot.params['qid'] //these variables are coming from app-routing module that we defined
    this.qTitle = this._route.snapshot.params['title']
    this._question.getQuestionsOfQuiz(this.qid).subscribe(
      (data:any) => {
        console.log(data)
        this.questions = data;
      },

      (error) => {
        console.log(error);
        Swal.fire("Oops!", "There was an error while loading the data", "error");
      }
    )
  }

  //delete question
  deleteQuestion(qid:any){
    Swal.fire({
      icon : 'warning',
      title : 'Are you sure you want to delete this question permenantly?',
      confirmButtonText : 'Delete',
      showCancelButton : true,

    }).then((result) =>{
      if(result.isConfirmed){
        //confirm
        this._question.deleteQuestion(qid).subscribe(
          //success
          (data) => {
            Swal.fire('Success!', 'The quiz has been deleted', 'success')

            //filter
            this.questions = this.questions.filter((q) => q.quesId != qid);
          },

          (error) =>{
            console.log(error);
            Swal.fire('Server Error!', 'Your request could not be fulfilled', 'error');
          }
        )
      }
    })
  }

}
