import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class EidtUserService {

  constructor(private httpService:HttpService) { }

  eidtUser(user){
    return this.httpService.update(user);
  }
}
