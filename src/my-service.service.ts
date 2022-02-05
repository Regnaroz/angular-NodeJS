import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor(private httpClient: HttpClient) { 


  }

  

  getDataList(){
  return  this.httpClient.get('http://localhost:3000/api/getData')
  }
  getQuizzReview(StdId:any,ScormId:number){
    const myObject={
      stdId:StdId,
      ScormId:ScormId,
    }
    
    
    const header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const requestOptions = {
      headers: new HttpHeaders(header),
    };
   

    return this.httpClient.post('http://localhost:3000/LRS/getQuizzReview',myObject,requestOptions)
  }
  getResultStatementByScorm(Data:any ){
    const header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const requestOptions = {
      headers: new HttpHeaders(header),
    };
   
    return  this.httpClient.post('http://localhost:3000/LRS/getResultStatmentByScorm',Data,requestOptions)  
  
  }

  getStatemnetByName(name:any ){
    const header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const requestOptions = {
      headers: new HttpHeaders(header),
    };
   
    return  this.httpClient.post('http://localhost:3000/LRS/getStudentByName',name,requestOptions)  
  
  }
  getStatemnetByVerb(Verb:any ){
    const header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const requestOptions = {
      headers: new HttpHeaders(header),
    };
   
    return  this.httpClient.post('http://localhost:3000/LRS/getStatmentsByVerb',Verb,requestOptions)  
  
  }


  sendData(data:any){
    
      const header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const requestOptions = {
      headers: new HttpHeaders(header),
    };
    
    return this.httpClient.post<any>('http://localhost:3000/api/mypost',data,requestOptions)
  }
}



