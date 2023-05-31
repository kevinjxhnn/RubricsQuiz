import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit{

  categories! : any[]

  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _cat: CategoryService,
    private _snack: MatSnackBar,
    private _router: Router,
    ){}

  qid = 0;
  quiz: any;

  ngOnInit(): void {
    
    this.qid = this._route.snapshot.params['qid'];
    
    this._quiz.getQuiz(this.qid).subscribe(
      (data:any) => {
        this.quiz=data;
        console.log(this.quiz)
      },
      (error) => {
        console.log(error)
      }
    )

    this._cat.categories().subscribe(
      //success
      (data:any) => {
        this.categories=data;

      },

      (error) => {
        console.log(error);
        Swal.fire("Oops!", "There was an error while loading categories", "error");
      }
    )
  }

  //update form after submit
  public updateData(){
    // Validation checks
    if (this.quiz.title.trim() == '' || this.quiz.title == null) {
      this._snack.open('Title is required', 'Got it', {
        duration: 4000,
      });

      return;
    }

    if (this.quiz.maxMarks.trim() == '' || this.quiz.maxMarks == null) {
      this._snack.open('Max Marks should be filled', 'Got it', {
        duration: 4000,
      });

      return;
    }

    if (this.quiz.numberOfQuestions.trim() == '' || this.quiz.numberOfQuestions == null) {
      this._snack.open('Number of Questions should be filled', 'Got it', {
        duration: 4000,
      });

      return;
    }

    this._quiz.updateQuiz(this.quiz).subscribe(
      (data:any) => {
        Swal.fire('Success!', 'Quiz has been updated', 'success').then((e) => {
          this._router.navigate(['/admin/quizzes'])
        });
      },
      (error) => {
        console.log(error);
        Swal.fire('Server Error!', 'Your request could not be fulfilled', 'error');
      }
    )
  }

}
