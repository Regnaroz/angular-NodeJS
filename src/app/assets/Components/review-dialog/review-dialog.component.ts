import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyServiceService } from 'src/my-service.service';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.css']
})
export class ReviewDialogComponent implements OnInit {
 stdId:any
 scormId:any
 stm:any

 QuizzQuestionsList:any
  constructor(private dialog:MatDialog ,@Inject(MAT_DIALOG_DATA)  data: any,private service :MyServiceService)  {
    console.log(data);
    this.stdId=data.stdId
    this.scormId=data.scormId
    this.stm=data.stm
    this.getQuizzReview(this.stdId,this.scormId)
    }

  ngOnInit(): void {
  }

  //get only questions for the studendId,ScormID
  getQuizzReview(stdId:any,scormId:number){
    console.log(stdId+'  '+scormId);
    
      this.service.getQuizzReview(stdId,scormId).subscribe((Stm:any)=>{
        this.QuizzQuestionsList=Stm.data
        
        
      })
  }
  CloseDialog(){
    this.dialog.closeAll()
  }
}
