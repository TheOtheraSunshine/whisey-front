import { VolunteerService } from './volunteer.service';
import { Volunteer } from './../model/volunteer.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent implements OnInit {

  volunteers: Volunteer[]

  constructor(private volunteerService: VolunteerService) { }

  ngOnInit(): void {
    this.volunteerService.findAll().subscribe(data => {
      this.volunteers = data;
    })
  }

}
