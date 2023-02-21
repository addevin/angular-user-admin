import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminApiService } from 'src/app/services/admin-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  constructor(private api:AdminApiService, private route:Router){}

  adminForm = new FormGroup({
    user: new FormControl(null),
    password: new FormControl(null)
  })
  loginRes:any;
  onLogin(){
    this.api.doLogin(this.adminForm.value).subscribe((val)=>{
      console.log(val);
      this.loginRes = val;
      if(val.status=='ok' && val.data.token.token !==undefined){
        localStorage.setItem('adtoken',val.data.token.token)
        localStorage.setItem('adtokenExp',val.data.token.exp)
        console.log(val,'Login##');
        
        this.route.navigate(['/admin'])
      }
    })
  }
}