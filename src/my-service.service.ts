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



