import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { SharedServiceService } from './shared-service.service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {



  private httpOptions = {
    headers: new HttpHeaders({
      'content-Type':'application/json' 
    })
  }
  //httpOptions.headers.append('Authentication','lasjfhlskdjflsdjkfsd;fkj')

  constructor(private http:HttpClient) { }
  private apiURL = "http://localhost:3000"
  doLogin(data:any):Observable<any>{
    return this.http.post(`${this.apiURL}/auth/login`, data, this.httpOptions)
  }
  doSignup(data:any):Observable<any>{
    return this.http.post(`${this.apiURL}/auth/signup`, data, this.httpOptions)
  }
  doTest():Observable<any>{
    return this.http.get(`${this.apiURL}/test`, this.httpOptions)
  }
  getProducts():Observable<any>{
    return this.http.get(`${this.apiURL}/products`, this.httpOptions)
  }
  getUserData():Observable<any>{
    return this.http.get(`${this.apiURL}/userdata`, this.httpOptions)
  }
  updateUserData(data:any):Observable<any>{
    return this.http.put(`${this.apiURL}/userupdate`,data , this.httpOptions)
  }
  avatarUpload(data:any):Observable<any>{
     let httpOption = {
      headers: new HttpHeaders({
        'content-Type':'multipart/form-data' 
      })
    }
    return this.http.put(`${this.apiURL}/setAvatar`,data )
  }
  
}
