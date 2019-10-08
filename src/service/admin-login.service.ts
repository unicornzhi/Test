import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  constructor(private httpService:HttpService) { }

  adminLogin(name){
    console.log("name",name);
    return this.httpService.queryAdminPwd(name);
  }
}
