import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as $ from "jquery";
import baseUrl from 'src/app/services/helper';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

declare var Razorpay: any;


@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})

export class DonateComponent implements OnInit{
  
  constructor(
    private _snack : MatSnackBar,
    private _login : LoginService
    ){}
    
  token = this._login.getToken();

  
  ngOnInit(): void {
  }
  
  //first req to server to create order

  paymentStart = () => {
    let amount = $('#payment_field').val()
    if(amount == '' || amount == null){
      this._snack.open("Please enter a valid amount", 'Got it',{
        duration: 4000,
        verticalPosition: 'bottom',
      })

      return;
    }

    

    //ajax is used to send request to server to create order from jquery
    $.ajax(
      {
        url: `${baseUrl}/user/create_order`,
        data: JSON.stringify({amount: amount, info: 'order_request'}),
        contentType: 'application/json',
        type: 'POST',
        dataType: 'json',
        headers: {'Authorization': `Bearer ${this.token}`},

        success: function(response:any){
          //this is invoked when we get success response
          console.log(response)
          if(response.status == 'created'){
            // open payment form
            let options={
              key : 'rzp_test_u10lRfsptNxBjz',
              amount: response.amount,
              currency: 'INR',
              name: 'Rubrics: Buy Us Coffee',
              description: 'Donation',
              order_id: response.id,

              handler:function(response : any){
                console.log(response.razorpay_payment_id)
                console.log(response.razorpay_order_id)
                console.log(response.razorpay_signature)
                console.log("Payment successful")


                updatePaymentOnServer(response.razorpay_payment_id, response.razorpay_order_id, 'paid');


                
              },
              prefill: {
                name: "",
                email: "",
                contact: ""
              },

              notes: {
                address: "Rubrics Quiz Portal"
                
              },
              theme: {
                color: "#3399cc"
              },
              
            };
            let rzp = new Razorpay(options)

            rzp.open();
            
            rzp.on('payment.failed', function(response: any){
              console.log(response.error.code);
              console.log(response.error.description);
              console.log(response.error.source);
              console.log(response.error.step);
              console.log(response.error.reason);
              console.log(response.error.metadata.order_id);
              console.log(response.error.metadata.payment_id);

              

              Swal.fire('Server Error!', 'Payment could not be proceessed', 'error');
            });
          }


        },
        
        error: function(error){
          //invoked when there is error
          console.log(JSON.stringify(error))

          Swal.fire('Server Error!', 'Your request could not be fulfilled', 'error');
        }

      }
    )

    const updatePaymentOnServer = (payment_id: any, order_id: any, status: string) => {

      $.ajax({
        url: `${baseUrl}/user/update_order`,
        data: JSON.stringify({payment_id: payment_id, order_id: order_id, status : status}),
        contentType: 'application/json',
        type: 'POST',
        dataType: 'json',
        headers: {'Authorization': `Bearer ${this.token}`},
    
        success:function(response){
          Swal.fire('Success!', 'Your payment was successfull', 'success');
        },
        
        error: function(error){
          Swal.fire('Server Error!', 'Your payment was successful, but we could not capture it. We will contact you as soon as possible', 'error');
        }
    
      });
  }

}

}




