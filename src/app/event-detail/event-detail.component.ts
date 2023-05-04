import { Component, OnInit } from '@angular/core';
import {Category, Events} from "../models";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {EventifyService} from "../eventify.service";

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event!: Events;
  router: Router;
  constructor(private routerr: Router, private route: ActivatedRoute, private location: Location, private eventifyService: EventifyService) {
    this.router = routerr;
  }

  ngOnInit(): void {
    this.getEvent();
  }
  getEvent() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.eventifyService.getEvent(id).subscribe((event) => {
        this.event = event;
      });
    });
  }

  share() {
    window.alert('The product has been shared!');
  }



  remove(event: Events) {
    if(event.id)
    this.eventifyService.deleteEvent(event.id).subscribe(
        event => {
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Failed to remove event: ', error);
        }
    );
  }

}
