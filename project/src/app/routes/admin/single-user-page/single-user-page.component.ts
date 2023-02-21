import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-single-user-page',
  templateUrl: './single-user-page.component.html',
  styleUrls: ['./single-user-page.component.css']
})
export class SingleUserPageComponent {
  constructor(private router:ActivatedRoute, private api:AdminApiService){
    this.getUser()
  }
  UserID = this.router.snapshot.paramMap.get('id') 
  userData:any;
  FormData:any={
    username:"Loading...",
    email:"Loading...",
    phone:"..."
  }
  status:any={message:'',err:false};
  getUser(){
    this.api.adGetUserData(this.UserID).subscribe((data)=>{
      const dataToUser = data.data.userData ? {
        username:data.data.userData.username,
        email:data.data.userData.email,
        phone:data.data.userData.phone
      } :{};
      this.FormData = data.status == 'ok'? dataToUser :{username:'nodata',email:'nodata',phone:999999999};
      if(data.status != 'ok'){

        this.status=  {message:data.message,err:true};
      }
    })
  }
  onFormSubmit(){
    this.api.updateUserData(this.UserID,this.FormData).subscribe((data)=>{
      if(data.status == 'ok'){
        this.getUser()
      }
      this.status.message = data.message;
      this.status.err = data.status != 'ok'?true:false;      
    })
  }
  
}
