import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  model:any;
  passToggle:boolean = false;
  constructor(private api:ApiService, private route:Router, private sharedService:SharedServiceService){}
  loginForm = new FormGroup({
    'user':new FormControl(''),
    'password':new FormControl('')
  })

  loginRes:any;
  loginSubmit(){
    console.log(this.loginForm.value);
    this.api.doLogin(this.loginForm.value).subscribe({
      next:(val)=>{
      this.loginRes = val;
      if(val.status=='ok' && val.data.token.token !==undefined){
        localStorage.setItem('token',val.data.token.token)
        localStorage.setItem('tokenExp',val.data.token.exp)
        
        this.sharedService.refreshUserData()
        this.route.navigate(['/'])
      }
    },
    error:(err)=>{
      console.log('ERRORR');
      this.loginRes = {}
      this.loginRes = {
        status:'undefined',
        message:'Connection error or verification error!',
        data:{}
      }
    }})
  }
  passwordToggle(){
    this.passToggle = !this.passToggle;
  }
}
