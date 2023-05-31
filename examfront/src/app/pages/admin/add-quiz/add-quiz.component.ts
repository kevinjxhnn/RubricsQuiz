import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit{

  categories! : any[]
  
  quizData = {
    title: '',
    description : '',
    maxMarks : '',
    numberOfQuestions: '',
    active: true,
    category: {
      cId: '',
    },
  }

  constructor(
    private _cat: CategoryService, 
    private _snack: MatSnackBar,
    private _quiz: QuizService){  }

  ngOnInit(): void {

    this._cat.categories().subscribe(
      //success
      (data:any) => {
        this.categories=data;
        console.log(this.categories);

      },

      (error) => {
        console.log(error);
        Swal.fire("Oops!", "There was an error while loading the data", "error");
      }
    )
  }

  addQuiz(){
    // Validation checks
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this._snack.open('Title is required', 'Got it', {
        duration: 4000,
      });

      return;
    }

    if (this.quizData.maxMarks.trim() == '' || this.quizData.maxMarks == null) {
      this._snack.open('Max Marks should be filled', 'Got it', {
        duration: 4000,
      });

      return;
    }

    if (this.quizData.numberOfQuestions.trim() == '' || this.quizData.numberOfQuestions == null) {
      this._snack.open('Number of Questions should be filled', 'Got it', {
        duration: 4000,
      });

      return;
    }

    if (this.quizData.category.cId == '' ||  this.quizData.category == null) {
      this._snack.open('Please select the category', 'Got it', {
        duration: 4000,
      });

      return;
    }

    //Success
    //Calling the server
    this._quiz.addQuiz(this.quizData).subscribe(
      (data:any) =>{
        Swal.fire('Success!', 'New Quiz has been added', 'success');
        this.quizData.title = '',
        this.quizData.description = '',
        this.quizData.maxMarks = '',
        this.quizData.numberOfQuestions = '',
        this.quizData.category.cId=''
      },

      (error) => {
        console.log(error);
        Swal.fire('Server Error!', 'Your request could not be fulfilled', 'error');
      }
    )
  }

}
