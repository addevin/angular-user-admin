import { Component } from '@angular/core';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfilePageComponent {
  constructor(private shared:SharedServiceService, private api:ApiService){
    this.getUser()
  }
  userData:any={
    data:{
      userData:{
        name:null,
        username:null,
        email:null,
        phone:null
      }
    }
  };
  loader = false;
  response:any ;
  updateForm:any = this.userData.data.userData
  displayStat:any= {
    username:false,
    email:false,
    password:false
  }
  
  getUser(){
    this.shared.refreshUserData();
    this.shared.getUser().subscribe((data)=>{
      this.userData = data;
      this.updateForm = data.data.userData

      
      if(!data.authenticated){
        localStorage.clear()
        this.shared.refreshUserData();
      } 
    })
  }
  showInput(name:string){
    this.displayStat[name] =true;
  }
  UpdateUser(){
    this.loader = true;
    this.api.updateUserData(this.updateForm).subscribe((val)=>{
      this.response = val
      this.shared.refreshUserData()
      this.loader = false;
      setTimeout(() => {
        this.response = undefined
      }, 5000);
    })
  }
  uploadProfile(e:any){
    this.loader = true;
    const formData = new FormData();
    formData.append('avatar', e.target.files[0]);
    this.api.avatarUpload(formData).subscribe((data)=>{
      this.response = data
      this.shared.refreshUserData()
      this.loader = false;
      setTimeout(() => {
        this.response = undefined
      }, 5000);
      
    })
  }
}
