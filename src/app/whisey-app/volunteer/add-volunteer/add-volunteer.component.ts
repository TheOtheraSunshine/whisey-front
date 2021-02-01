import { VolunteerService } from './../volunteer.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Volunteer } from '../../model/volunteer.model';
import { VolunteerUpdateDto } from '../../model/volunteer-update-dto.model';

const EMPTY_STRING = '';

@Component({
  selector: 'app-add-volunteer',
  templateUrl: './add-volunteer.component.html',
  styleUrls: ['./add-volunteer.component.css']
})
export class AddVolunteerComponent implements OnInit {

  volunteerDto = {
    firstName: EMPTY_STRING,
    lastName: EMPTY_STRING,
    email: EMPTY_STRING,
    contact: EMPTY_STRING,
    username: EMPTY_STRING,
    password: EMPTY_STRING
  }

  volunteers: Volunteer[];
  selectedVolunteer: Volunteer;

  constructor(
    private volunteerService: VolunteerService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getVolunteers();
  }

  addVolunteer() {
    this.volunteerService.addVolunteer(this.volunteerDto).subscribe(
      () => {
        this.snackBar.open("Volonter je dodan.","",{duration: 2000});
  })
  }

  getVolunteers() {
    this.volunteerService.findWaiting().subscribe(data => {
      this.volunteers = data;
    })
  }

  approve() {
      this.volunteerService.updateVolunteer(this.volunteerToUpdateApprove()).subscribe(
        () => {
          this.snackBar.open("Volonter je odobren.","",{duration: 2000});
          this.getVolunteers();
        },
        (err) => {
          this.snackBar.open("Došlo je do pogreške.","",{duration: 2000});
          console.log(err);
        });
  }

  decline() {
    this.volunteerService.updateVolunteer(this.volunteerToUpdateDecline()).subscribe(
      () => {
        this.snackBar.open("Volonter je odbijen.","",{duration: 2000});
        this.getVolunteers();
      },
      (err) => {
        this.snackBar.open("Došlo je do pogreške.","",{duration: 2000});
        console.log(err);
      });
  }

  volunteerToUpdateApprove() {
    var volunteerUpdateDto = {
      idVolunteer: this.selectedVolunteer.idVolunteer,
      firstName: this.selectedVolunteer.firstName,
      lastName: this.selectedVolunteer.lastName,
      email: this.selectedVolunteer.email,
      contact: this.selectedVolunteer.contact,
      idRole: this.selectedVolunteer.role.idRole,
      idRegistrationStatus: 1,
      username: this.selectedVolunteer.username,
      password: this.selectedVolunteer.password
    }

    return volunteerUpdateDto;
  }

  volunteerToUpdateDecline() {
    var volunteerUpdateDto = {
      idVolunteer: this.selectedVolunteer.idVolunteer,
      firstName: this.selectedVolunteer.firstName,
      lastName: this.selectedVolunteer.lastName,
      email: this.selectedVolunteer.email,
      contact: this.selectedVolunteer.contact,
      idRole: this.selectedVolunteer.role.idRole,
      idRegistrationStatus: 2,
      username: this.selectedVolunteer.username,
      password: this.selectedVolunteer.password
    }

    return volunteerUpdateDto;
  }

}
