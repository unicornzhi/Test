import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  constructor(private httpService:HttpService) { }

  addUser(user){
    console.log("user",user);
    return this.httpService.insert(user);
  }
}
