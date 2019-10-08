import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserListService } from 'src/service/user-list.service';
import { DeleteUserService } from 'src/service/delete-user.service';
import { AddUserService } from 'src/service/add-user.service';
import { EidtUserService } from 'src/service/eidt-user.services';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {

  users = [];
  selectedUser = [];
  display = "none";
  fontColor = '';


  userId: number;
  username: string = "";
  pwd: string = "";
  age: number = 0;
  selectedSex: string = "";
  selectedSports: string = "";



  success: string = 'none';
  defeat: string = 'none';

  addfieldMsg: string = 'none';
  updatefieldMsg: string = 'none';


  warnNames = [];
  warn_div :string = 'none';
  input_name: string = "";
  // 显示信息
  newUserMsg = new Array();
  // 控制弹出层
  addSiderbar: boolean = false;
  title: string = "";
  text: string = "";

  constructor(private userListService: UserListService,
    private deleteUserService: DeleteUserService,
    private addUserService: AddUserService,
    private editUserService: EidtUserService, ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userListService.getAllUsers().subscribe(data => {
      Object.values(data).forEach(user => {
        this.users.push(user);
      })
      console.log("users", this.users);
    })
  }
  // showDetail(selectedUser) {
  //   let targetNode = document.getElementById(`${selectedUser[0].name}`);
  //   if (!targetNode) {
  //     alert("请翻页");
  //     return;
  //   }
  //   targetNode.style.backgroundColor = '#decfd7';
  //   setTimeout(() => {
  //     targetNode.style.backgroundColor = '';
  //   }, 1000)
  // }
  onKey() {
    this.warn_div ="block";
    console.log("input-name", this.input_name)
    //  let inputVal = this.input_name.toLowerCase();
    this.warnNames = [];
    if (this.input_name.length) {
      this.users.forEach(user => {
        let flag = user.name.search(this.input_name);
        if (flag != -1) {
          this.warnNames.push(user.name);
        }
      })
    } else {
      this.warn_div = "none";
      this.warnNames = [];
    }
  }
  changInput(username){
    this.input_name = username;
    this.warn_div = "none";
    console.log("username",username);
  }
  search(name){
    this.users.forEach( (user,index) =>{
      if(user.name == name){
          [this.users[0],this.users[index]]=[this.users[index],this.users[0]];
      }
    })
    // let targetNode = document.getElementById("table_body");
    // console.log(targetNode);
    // targetNode.firstChild[0].style.backgroundColor = "green";
  }



  deleteUser(id, node) {
    let delId = { "id": id };
    let targetNode = node.target.parentNode.parentNode;
    this.deleteUserService.deleteUser(delId).subscribe(data => {
      Object.keys(data).forEach(key => {
        if (key == 'affectedRows') {
          let flag = data[key];
          if (flag == 1) {
            targetNode.remove();
            this.users = [];
            this.getUsers();
          }
        }
      })
    })
  }

  selected_user = new User();
  eidtUser = new User();

  openEidtSiderbar(user: User) {
    this.eidtUser = user;
    this.title = "编辑用户";
    this.text = "编辑后的用户信息如下:";
    console.log("eidtUser", this.eidtUser);
    this.addSiderbar = true;
    this.userId = user.id;
  }
  updateUser() {
    let userInfo = this.getUserInfo();
    this.newUserMsg = [];
    this.editUserService.eidtUser(userInfo).subscribe(data => {
      let flag = this.getFlag(data);
      if (flag == 1) {
        let newUserInfo = this.newUserInfo(userInfo, this.eidtUser);
        console.log("userInfo", newUserInfo)
        this.newUserMsg.push(newUserInfo);
        this.showInfoDiv = "block";
        this.users = [];
        this.getUsers();
      } else {
        this.updatefieldMsg = "block";
      }
    })
  }

  openAddSiderbar() {
    this.addSiderbar = true;
    console.log(this.addSiderbar)
    this.title = "添加用户";
    this.text = "新添加用户信息如下:";
  }
  addUser() {
    let userInfo = this.getUserInfo();
    this.addUserService.addUser(userInfo).subscribe(data => {
      let flag = this.getFlag(data);
      console.log("addFlag", flag)
      if (flag == 1) {
        this.newUserMsg.push(userInfo);
        this.showInfoDiv = "block";
        console.log("newuserMsg", this.newUserMsg)
        this.users = [];
        this.getUsers();
      } else {
        this.addfieldMsg = "block";
      }
    })
  }

  submitInfo() {
    if (this.title == "添加用户") {
      this.addUser();
    } else {
      this.updateUser();
    }
  }
  newUserInfo(userInfo, eidtUser) {
    if (userInfo.name == "") {
      userInfo.name = eidtUser.name;
    }
    if (userInfo.password == "") {
      userInfo.password = eidtUser.password;
    }
    if (userInfo.age == 0) {
      userInfo.age = eidtUser.age;
    }
    if (userInfo.sex == "") {
      userInfo.sex = eidtUser.sex;
    }
    if (userInfo.interest == "") {
      userInfo.interest = [eidtUser.interest];
    }
    return userInfo;
  }
  getUserInfo() {
    let user = {
      "id": this.userId,
      "name": this.username,
      "password": this.pwd,
      "age": this.age,
      "sex": this.selectedSex,
      "interest": this.selectedSports
    };
    return user;
  }
  getFlag(data) {
    let flag: number = 0;
    Object.keys(data).forEach(key => {
      if (key == 'affectedRows') {
        flag = data[key];
      }
    })
    return flag;
  }
  showInfoDiv: string = "";
  clearInput() {
    this.userId = 0;
    this.username = "";
    this.pwd = "";
    this.age = 0;
    this.selectedSex = "";
    this.selectedSports = "";
    this.showInfoDiv = "none";
    this.updatefieldMsg = "none";
    this.addfieldMsg = "none";
    this.addSiderbar = false;
  }

}
class User {
  id: number;
  name: string;
  password: string;
  age: number;
  sex: string;
  interest: string;
}

