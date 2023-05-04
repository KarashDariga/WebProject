import { Component, OnInit } from '@angular/core';
import {EventifyService} from "../eventify.service";
import {Router} from "@angular/router";
import {Events, Category, Company} from "../models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  event: Events = {
      id: 0,
      title: '',
      desc: '',
      info: '',
      category: 0,
      company: 0
  }

  companies: Company[] = [];
  categories: Category[] = [];

  router: Router;
  constructor(private service: EventifyService, private routerr: Router, private formBuilder: FormBuilder) {
    this.router = routerr;

  }



  ngOnInit(): void {
    this.service.getCompanies().subscribe(
        (companies: Company[]) => {
          this.companies = companies;
        },
        error => {
          console.error("Failed to get companies: ", error);
        }
    )

    this.service.getCategories().subscribe(
        (categories: Category[]) => {
          this.categories = categories;
        },
        error => {
          console.error("Failed to get categories: ", error);
        }
    )
  }
  onSubmit() {

    this.service.createEvent(this.event).subscribe(
        response => {
          console.log("Event created successfully");
        },
        error => {
          console.error("Failed to create event: ", error, this.event.company, this.event.category);
        }
    )
  }
}
