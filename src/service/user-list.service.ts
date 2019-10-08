import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  
  constructor( private httpService : HttpService) { }
   getAllUsers(){
      return this.httpService.getUserList();
   }

   getOneUser(id){
     return this.httpService.queryById(id);
   }
}
