import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DeleteUserService } from 'src/service/delete-user.service';
import { AddUserService } from 'src/service/add-user.service';
import { EidtUserService } from 'src/service/eidt-user.services';
import { UserListService } from 'src/service/user-list.service';

@Component({
  selector: 'app-left-tool',
  templateUrl: './left-tool.component.html',
  styleUrls: ['./left-tool.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LeftToolComponent implements OnInit {

  deleteSiderbar: boolean = false;
  userId: number;
  success: string = 'none';
  defeat: string = 'none';
  addSiderbar: boolean = false;
  showUpdateUser: string = 'none';
  showAddUser: string = 'none';
  addfieldMsg: string = 'none';
  updatefieldMsg: string = 'none';
  constructor(
    private deleteUserService: DeleteUserService,
    private addUserService: AddUserService,
    private editUserService: EidtUserService,
    private userListService: UserListService) { }

  items: MenuItem[];
  ngOnInit() {
    this.items = [{
      label: '管理用户',
      items: [
        { label: '删除用户' },
        { label: '添加用户' },
        { label: '编辑用户' },
        { label: '锁定用户' }
      ]
    },
    {
      label: '查询用户',
      items: [
        { label: '详细信息' },
        { label: '详细信息' },
        { label: '详细信息' }
      ]
    },
    {
      label: '管理用户',
      items: [
        { label: '用户登录' },
        { label: '锁定用户' }
      ]
    },
    ]
  }
  showSelected(selected) {
    let selectedText = selected.target.innerText;
    if (selectedText == '删除用户') {
      this.deleteSiderbar = true;
    } else if (selectedText == '添加用户') {
      this.showUpdateUser = "none";
      this.showAddUser = "block";
      this.addSiderbar = true;
    } else if (selectedText == '编辑用户') {
      this.showAddUser = "none";
      this.showUpdateUser = "block";
      this.addSiderbar = true;
    }
    console.log("selected", selectedText)
  }

  deleteUser() {
    let id = { "id": this.userId };
    this.deleteUserService.deleteUser(id).subscribe(data => {
      let flag = this.getFlag(data);
      if (flag == 1) {
        this.success = 'block';
        setTimeout(() => {
          this.success = 'none';
          this.deleteSiderbar = false;
        }, 1000)
      } else {
        this.defeat = 'block';
        setTimeout(() => {
          this.defeat = 'none';
        }, 1000)
      }
    });
  };

  username: string = "";
  pwd: string = "";
  age: number = 0;
  selectedSex: string = "";
  selectedSports: string = "";
  newUserMsg = new Array();


  submitInfo() {
    if (this.showAddUser == 'block') {
      this.addUser();
    } else {
      this.editUser();
    }
  }
  addUser() {
    let userInfo = this.getUserInfo();
    this.addUserService.addUser(userInfo).subscribe(data => {
      let flag = this.getFlag(data);
      console.log("addFlag", flag)
      if (flag == 1) {
        this.newUserMsg.push(userInfo);
        console.log("newuserMsg", this.newUserMsg)
      } else {
        this.addfieldMsg = "block";
      }
    })
  }

  editUser() {
    let userInfo = this.getUserInfo();
    this.editUserService.eidtUser(userInfo).subscribe(data => {
      let flag = this.getFlag(data);
      if (flag == 1) {
        let user = this.getOldUserInfo(userInfo);
        console.log("userInfo",user)
        this.newUserMsg.push(user);
      } else {
        this.updatefieldMsg = "block";
      }
    })
  }

getOldUserInfo(userInfo) {
    let id = {"id":userInfo.id};
   this.userListService.getOneUser(id).subscribe(data => {
      Object.values(data).forEach(user => {
        console.log("userInfo_query",userInfo)
        if (userInfo.name == "") {
          userInfo.name = user.name;
        } 
        if (userInfo.password == "") {
          userInfo.password = user.password;
        } 
        if (userInfo.age == 0) {
          userInfo.age = user.age;
        } 
        if (userInfo.sex == "") {
          userInfo.sex = user.sex;
        } 
        if (userInfo.interest == "") {
          userInfo.interest = [user.interest];
        }
      })
    })
    return  userInfo;
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
    this.addSiderbar = false;
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


}
