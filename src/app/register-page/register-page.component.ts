import { Component, OnInit } from '@angular/core';
import {EventifyService} from "../eventify.service";
import {LoginData, Token} from "../models";
import {RegisterService} from "../register.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  username: string = "";
  password: string = "";
  constructor(private service: RegisterService, private router: Router) {
    this.route = router;
  }

  route: Router;

  onSubmit() {
    const formData = {
      username: this.username,
      password: this.password
    }
    this.service.register(formData).subscribe(
        response => {
          console.log("Registration successful");
          this.route.navigate(['/login']);
        },
        error => {
          console.error('Failed to register', error)
        }
    )
  }

  // register(){
  //   this.service.register(this.login, this.password).subscribe(
  //       (response) => {
  //         console.log("cool");
  //         this.route.navigate(['/login']);
  //       },
  //       error => {
  //         console.error('Failed to register: ', error);
  //       }
  //   )
  // }

  ngOnInit(): void {
  }


}
