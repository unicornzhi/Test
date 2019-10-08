import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  root: string = "http://localhost:3000/";
  constructor(private http: HttpClient) { }
  // getUrls(){
  //     this.http.get('../assets/url.json').subscribe( urls =>{

  //     });
  // }
  getUserList() {
    let url = this.root + "usersList";
    return this.http.get(url);
  };
  queryById(id) {
    let url = this.root + "search";
    return this.http.post(url, id);
  }
  delete(id) {
    let url = this.root + "deleteUser";
    return this.http.post(url, id);
  }
  insert(user) {
    let url = this.root + "insertUser";
    return this.http.post(url, user);
  }
  update(user) {
    let url = this.root + "editMsg";
    return this.http.post(url, user);
  }
  queryAdminPwd(name){
    let url = this.root + "adminLogin";
    return this.http.post(url,name);
  }
}