import { Component } from "@angular/core";
import { MyServiceService } from "src/my-service.service";
import { FormsModule } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ReviewDialogComponent } from "./assets/Components/review-dialog/review-dialog.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  myList: any;
  searchList:any
  ScormResult:any=[]
  constructor(private servie: MyServiceService,private dialog:MatDialog) {
    servie.getDataList().subscribe((data: any) => {
      this.myList = data;
      });
   this.getStatemnetByName('bbbbbb')
   this.getStatementByVerb('attempted')
   this.getResultStatement(1)
  }

  openReviewDialog(stdId:any,scormId:any,Stm:any){
 console.log(stdId + '  '+scormId);
 const dialogConfig = new MatDialogConfig();
dialogConfig.height='90%'
dialogConfig.width='70%'
dialogConfig.data={
  stdId:stdId,
  scormId:scormId,
  stm:Stm

}
 dialogConfig.autoFocus = true;

 this.dialog.open(ReviewDialogComponent, dialogConfig);

 
  }
  getStatementByVerb(verb:any){
const myVerb={
  Verb:verb
}

this.servie.getStatemnetByVerb(myVerb).subscribe((data:any)=>{
  this.searchList=data.data
  
})


  }

  getResultStatement(scormId:any){
  const  myScorm={
      scormId:scormId
    }
    this.servie.getResultStatementByScorm(myScorm).subscribe((data:any)=>{
      this.ScormResult = data.data
      console.log(data.data);
      
    })
  }
  getStatemnetByName(name:any ){
    
    const myobject={
      Name:name
    }
     this.servie.getStatemnetByName(myobject).subscribe((data:any)=>{
   

      //this.searchList=data.data
      
      
     })
  }

  //to refresh the list after a new Entry
  getList() {
    this.servie.getDataList().subscribe((data: any) => {
      this.myList = data.data;
   

    });
  }

  //sending form data to nodejs then to MongoDB
  onSubmit(dataform: any) {
    this.servie.sendData(dataform).subscribe((data: any) => {
     
      this.servie.getDataList().subscribe((data: any) => {
        this.myList = data.data;
      });
    });
  }
}
