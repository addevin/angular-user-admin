import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  constructor(private http:HttpClient) { }


  private httpOptions = {
    headers: new HttpHeaders({
      'content-Type':'application/json' 
    })
  }
  private apiURL = "http://localhost:3000"

  doLogin(data:any):Observable<any>{
    return this.http.post(`${this.apiURL}/auth/admin`, data, this.httpOptions)
  }
  adGetAllUsers():Observable<any>{
    return this.http.get(`${this.apiURL}/admin/getusers`, this.httpOptions)
  }
  adGetUserData(id:string|null):Observable<any>{
    return this.http.get(`${this.apiURL}/admin/getuser/${id}`, this.httpOptions)
  }
  updateUserData(id:string|null,data:any):Observable<any>{
    return this.http.put(`${this.apiURL}/admin/userupdate/${id}`,data , this.httpOptions)
  }
}
