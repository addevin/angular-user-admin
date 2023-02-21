import { Component } from '@angular/core';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent {
  constructor(private api:AdminApiService){
    this.getAllUsers()
  }
  usersList:any;
  getAllUsers(){
    this.api.adGetAllUsers().subscribe((data)=>{
      console.log(data);
      this.usersList = data.data.users;
    })
  }
}
