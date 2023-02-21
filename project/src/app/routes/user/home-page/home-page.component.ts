import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  btn :any
  userdata:any;
  prodData:any;
  constructor(private api:ApiService, private sharedData:SharedServiceService){
    this.sharedData.getUser().subscribe((data)=>this.userdata = data.data.userData  )
  }
  ngOnInit(): void {
    
    this.getProducts()
    
  }
  
  getProducts(){
    this.api.getProducts().subscribe({
      next:(val)=>{
      this.prodData = {
        products : val.data.products,
        url:val.data.url
      };
     
    },
    error:(err)=>{
      this.prodData = {
        err:'Connection error or verification error!',
        
      }
    }})
  }
}
