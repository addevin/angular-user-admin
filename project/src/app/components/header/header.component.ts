import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  btn:any;
  userData:any;
  constructor(private sharedData:SharedServiceService, private api:ApiService){
    this.sharedData.getUser().subscribe((data)=>{
      this.userData = data;
      
      if(!data.authenticated){
        localStorage.clear()
      } 
    })  
  }
  ngOnInit(){
  }
  logout(){
    this.sharedData.logout()
  }
}
