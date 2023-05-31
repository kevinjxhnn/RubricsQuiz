import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{

  qid:any;
  questions:any;

  marksGot=0;
  correctAnswers=0;
  attempted=0;

  isSubmit=false

  timer : any

  constructor(
    private locationSt:LocationStrategy,
    private _route : ActivatedRoute,
    private _question: QuestionService,

  ){}

  ngOnInit(): void {
    this.preventBackButton();

    this.qid = this._route.snapshot.params['qid']
    console.log(this.qid)

    this.loadQuestions();
     
  }

  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data:any) => {
        this.questions = data

        //time calculation = no of ques * 2 * 60s (timer has data in sec)
        this.timer = this.questions.length * 2 * 60
      

        console.log(this.questions)
        this.startTimer()
      },
      (error)=>{
        console.log(error)
        Swal.fire('Server Error!', 'Questions could not be loaded due to some internal error', 'error');
      }
    )
  }

  preventBackButton(){
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, '', location.href);
    })

  }

  sumbitQuiz(){
    Swal.fire({
      icon : 'warning',
      title : 'Are you sure you want to sumbit the quiz?',
      confirmButtonText : 'Submit',
      showCancelButton : true,

    }).then((e) =>{
      if(e.isConfirmed){
        this.evalQuiz();
        
      }
    })
  }


  startTimer(){
    let t = window.setInterval(() => {

      if(this.timer <= 0){
        this.evalQuiz()
        clearInterval(t)

      } else {
        this.timer--;
      }

    }, 1000) //calls this function in 1000 mili sec (1s)
  }
  
  getFormattedTime(){
    let hour = Math.floor((this.timer/60)/60)
    let minute = Math.floor(this.timer/60)
    let second =this.timer - minute * 60
    
    
    return `${hour} hr: ${minute} min: ${second} sec`
  }

  evalQuiz(){
    // this.isSubmit = true
    //     //calculation
    //     this.questions.forEach((q: { givenAnswer: any; answer: any; }) => {
    //       if(q.givenAnswer == q.answer){
    //         this.correctAnswers++;
    //         let marksSingle = this.questions[0].quiz.maxMarks/this.questions.length
    //         this.marksGot += marksSingle;

    //       }

    //       if(q.givenAnswer.trim() != ''){
    //         this.attempted++;
    //       }
        // });

    /* ----------------------------------------------------------------*/
      
    // Calling server to eval quiz
    this._question.evalQuiz(this.questions).subscribe(
      (data : any) =>{
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswers = data.correctAnswers;
        this.attempted = data.attempted;
        this.isSubmit = true;

      },
      (error) => {
        console.log(error);
      }
    )
  }

  printPage(){
    window.print();
  }
}
