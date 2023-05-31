import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit{

  quizzes! : any[]

  constructor(private _quiz: QuizService){

  }

  ngOnInit(): void {

    this._quiz.quizzes().subscribe(
      (data:any) => {
        this.quizzes=data;
        console.log(this.quizzes);
      },
      (error) => {
        console.log(error);
        Swal.fire("Oops!", "There was an error while loading the data", 'error')
      }
    )

  }

  deleteQuiz(qid: any){
    Swal.fire({
      icon : 'warning',
      title : 'Are you sure?',
      confirmButtonText : 'Delete',
      showCancelButton : true,

    }).then((result) => {
      if(result.isConfirmed){
        this._quiz.deleteQuiz(qid).subscribe(
          //success
          (data) => {
            this.quizzes = this.quizzes.filter((quiz) => quiz.qid != qid)
            
            Swal.fire('Success!', 'The quiz has been deleted', 'success')
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
