import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  
  constructor(private api:ApiService) {
    this.setDataAsObs()
    this.refreshUserData()
   }
   private subject = new Subject<any>();
   userData:any = {};

  
  refreshUserData(){
    this.api.getUserData().subscribe({
      next:(val)=>{
      this.userData = val
      this.setDataAsObs()
    },
    error:(err)=>{
      this.userData = {
        err:'Connection error or verification error!',
        data:{
          userData:{}
        }
      }
    }})
  }
  private setDataAsObs(){
    this.subject.next(this.userData)
    
  }
  getUser():Observable<any>{
    
    return this.subject.asObservable()
  }
  authValidate(){
    if( localStorage.getItem('token')){
      return true
    }
    return false
  }
  adminAuthValidate(){
    if( localStorage.getItem('adtoken')){
      return true
    }
    return false
  }
  logout(){
    localStorage.clear()
    this.refreshUserData()
  }
}
