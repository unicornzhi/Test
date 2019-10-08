import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdminLoginService } from 'src/service/admin-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  router:string = "";
  // 显隐弹出层
  // loginVisible: boolean = true;
  username: string = "";
  password: string = "";
  errorMsg: string = "none";
  errorInfo : string ="";
  userPage: string = "none";
  LoginPage :string = "block";
  constructor(private adminLoginService: AdminLoginService) { }

  ngOnInit() {
  }
  adminLogin() {
    if(this.username == ""){
      this.errorInfo = "请输入用户名和密码";
      this.errorMsg = "block";
      return;
    }
    let name = { "name": this.username };
    this.adminLoginService.adminLogin(name).subscribe(data => {
      if (Object.keys(data).length == 0) {
        this.errorInfo = "用户名或密码错误";
        this.errorMsg = "block";
        this.password = "";
      } else {
        Object.values(data).forEach(value => {
          if (this.password == value.password) {
            this.errorMsg = "none";
            this.router = "/user-list";
            // this.loginVisible = false;
            this.userPage = "block";
            this.LoginPage = "none";
          } else {
            this.errorMsg = "block";
          }
        })
      }
    })
  }
  clearInput() {
    this.username = "";
    this.password = "";
    this.errorMsg = "none";
  }
 
}
