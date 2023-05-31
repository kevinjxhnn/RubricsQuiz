import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Base64UploadAdapter } from '@ckeditor/ckeditor5-upload';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit{
  

  qid : any
  qTitle : any;

  question = {
    quiz : {
      qid: '',
    },
    content: '',
    option1 : '',
    option2 : '',
    option3 : '',
    option4 : '',
    answer : '',
  }

  constructor(
    private _route : ActivatedRoute,
    private _question : QuestionService,
    private _snack : MatSnackBar,
    ){}
  
  ngOnInit(): void {

    this.qid = this._route.snapshot.params['qid']
    this.qTitle = this._route.snapshot.params['title']
    console.log(this.qid)
    this.question.quiz['qid'] = this.qid
  }
  
  formSubmit(){

    //validation

    if(this.question.content.trim() == '' || this.question.content == null ){
      this._snack.open('Question content needs to be filled', 'Got it', {
        duration: 4000,
      });

      return;
    }

    if(this.question.option1.trim() == '' || this.question.option1 == null ){
      this._snack.open('Please enter atleast 2 options', 'Got it', {
        duration: 4000,
      });

      return;
    }

    if(this.question.option2.trim() == '' || this.question.option2 == null ){
      this._snack.open('Please enter atleast 2 options', 'Got it', {
        duration: 4000,
      });

      return;
    }

    if(this.question.answer.trim() == '' || this.question.answer == null ){
      this._snack.open('Please select the answer', 'Got it', {
        duration: 4000,
      });

      return;
    }

    this._question.addQuestion(this.question).subscribe(

      (data:any) =>{
        this.question.content='',
        this.question.answer='',
        this.question.option1 ='',
        this.question.option2 ='',
        this.question.option3 ='',
        this.question.option4 ='',
        
        Swal.fire('Success!', 'New Question has been added', 'success');
      },

      (error) => {
        console.log(error);
        Swal.fire('Server Error!', 'Your request could not be fulfilled', 'error');
      }

    )
    

  }

}
 