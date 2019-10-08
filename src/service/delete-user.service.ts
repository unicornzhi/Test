import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {

  constructor(private httpService : HttpService) { }

  deleteUser(id){
    console.log("id",id)
    return this.httpService.delete(id);
  }
}
