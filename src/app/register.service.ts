import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  registerUrl = 'http://localhost:8000/profile/register/';

  register(formData: any){
    return this.http.post(`${this.registerUrl}`, formData);
  }

  constructor(private http:HttpClient) { }
}
