import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './routes/error/page-not-found/page-not-found.component';
import { HomePageComponent } from './routes/user/home-page/home-page.component';
import { LoginPageComponent } from './routes/user/login-page/login-page.component';
import { SignupPageComponent } from './routes/user/signup-page/signup-page.component';
import { ProfilePageComponent } from './routes/user/profile-page/profile.component';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './layout/users/users.component';//layout
import { AdminComponent } from './layout/admin/admin.component'; //Layout
import { HomePageComponent as adminHome } from './routes/admin/home-page/home-page.component';
import { UsersPageComponent as adminUsers  } from './routes/admin/users-page/users-page.component';
import { LoginComponent as adminLogin } from './routes/admin/login/login.component';
import { SingleUserPageComponent as adminUser } from './routes/admin/single-user-page/single-user-page.component';

import { AuthGuard } from './guard-services/auth.guard';
import { AdminAuthGuard } from './guard-services/admin-auth.guard';

const routes: Routes = [
  {path:'auth/login',component: LoginPageComponent},
  {path:'auth/register',component: SignupPageComponent},
  {path:'auth/admin',component: adminLogin},

  {path:'', component: UsersComponent, children:[
    {path:'', component: HomePageComponent},
    {path:'profile', component: ProfilePageComponent, canActivate:[AuthGuard]},
  ]},
  {path:'admin', component: AdminComponent, children:[
    {path:'', component: adminHome},
    {path:'users', component: adminUsers},
    {path:'user/:id', component: adminUser},
    // {path: '**', pathMatch: 'full', component: PageNotFoundComponent },
  ], canActivate:[AdminAuthGuard]},
  {path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule,
    FormsModule
  ]
})
export class AppRoutingModule { }
