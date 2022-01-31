import { Component } from '@angular/core';
import { MyServiceService } from 'src/my-service.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

myList:any
  constructor(private servie:MyServiceService){

  servie.getDataList().subscribe((data:any)=>{

    this.myList=data.data
     
    
   })

   
  }

  onSubmit(dataform:any){
  this.servie.sendData(dataform)
 

  }
  
}
