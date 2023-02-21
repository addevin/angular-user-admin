import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {
  constructor(private api:ApiService, private route:Router, private sharedService:SharedServiceService){}
  signupRes:any;
  signupForm = new FormGroup({
    name: new FormControl(null),
    email: new FormControl(null),
    phone: new FormControl(null),
    password: new FormControl(null),
    repassword: new FormControl(null),
  })
  signupSubmit(){
    let data = JSON.parse(JSON.stringify(this.signupForm.value))
    data.username = data.name.replace(/[^a-zA-Z0-9]/g, '_')
    this.api.doSignup(data).subscribe({
      next:(val)=>{
      console.log(val);
      this.signupRes = val;
      if(val.status=='ok' && val.data.token !==undefined){
        localStorage.setItem('token',val.data.token.token)
        localStorage.setItem('tokenExp',val.data.token.exp)
        this.sharedService.refreshUserData()
        this.route.navigate(['/'])
      }
    },
    error:(err)=>{
      console.log('ERRORR');
      this.signupRes = {
        status:'undefined',
        message:'Connection error or verification error!',
        data:{}
      }
    }})
    
  }
}
