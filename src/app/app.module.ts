import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterModule , Routes } from "@angular/router";

import { InputTextModule} from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { OrderListModule } from 'primeng/orderlist';
import { TableModule } from "primeng/table";
import { SidebarModule } from "primeng/sidebar";
import { PasswordModule } from "primeng/password";
import { RadioButtonModule } from "primeng/radiobutton";
import { CheckboxModule } from "primeng/checkbox";
import { MessageModule } from "primeng/message";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitleComponent } from './title/title.component';
import { LeftToolComponent } from './left-tool/left-tool.component';

import { UserListComponent } from './user-list/user-list.component';
import { LoginComponent } from './login/login.component';
import { from } from 'rxjs';


@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    LeftToolComponent,
    UserListComponent,
    LoginComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    InputTextModule,
    MenuModule,
    OrderListModule,
    HttpClientModule,
    TableModule,
    SidebarModule,
    FormsModule,
    PasswordModule,
    RadioButtonModule,
    CheckboxModule,
    MessageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
