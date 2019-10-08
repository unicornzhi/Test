import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { LeftToolComponent } from './left-tool/left-tool.component';
import { TitleComponent } from './title/title.component';


const routes:Routes = [
  // {path:'',component:LoginComponent},
 {path:'',component:UserListComponent},
//  {path:'user-list',component:UserListComponent},
 {path:'title',component:TitleComponent},
 {path:'left-tool',component:LeftToolComponent},

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
