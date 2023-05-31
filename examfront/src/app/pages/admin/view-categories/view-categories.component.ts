import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit{

  categories! : any[]

  constructor(private _category:CategoryService){}

  ngOnInit(): void {

    this._category.categories().subscribe(
      (data:any) =>{
      //success
      this.categories = data;
      console.log(this.categories);
    },
    
    //fail
    (error) => {
      console.log(error);
      Swal.fire("Oops!", "There was an error while loading the data", "error");
    })

  }

  deleteCategory(cId : any){
    Swal.fire({
      icon : 'warning',
      title : 'Are you sure?',
      confirmButtonText : 'Delete',
      showCancelButton : true,

    }).then((result) => {
      if(result.isConfirmed){
        this._category.deleteCategory(cId).subscribe(
          //success
          (data : any) => {
            this.categories = this.categories.filter((category) => category.cId != cId)

            Swal.fire('Success!', 'The category has been deleted', 'success')
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
