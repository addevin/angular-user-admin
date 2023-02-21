import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private api:ApiService){}
  title = 'project';
  uData:any;
  ngOnInit(){
    // this.testUser()  
  }
  // testUser(){
  //   this.api.doTest().subscribe((data)=>{
  //     console.log(data);
  //     this.uData = data;
  //   })
  // }
}
