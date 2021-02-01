import { RegistrationStatus } from './../../../model/registration-status.model';
import { Volunteer } from './../../../model/volunteer.model';
import { VolunteerService } from './../../../volunteer/volunteer.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateConfDialogComponent } from '../update-student-dialog/update-conf-dialog.component';

@Component({
  selector: 'app-update-volunteer-dialog',
  templateUrl: './update-volunteer-dialog.component.html',
  styleUrls: ['./update-volunteer-dialog.component.css']
})
export class UpdateVolunteerDialogComponent implements OnInit {

  volunteerUpdateDto = {
    idVolunteer: this.data.idVolunteer,
    firstName: this.data.firstName,
    lastName: this.data.lastName,
    email: this.data.email,
    contact: this.data.contact,
    idRole: this.data.role.idRole,
    idRegistrationStatus: this.data.registrationStatus.idRegistrationStatus,
    username: this.data.username,
    password: this.data.password
  }

  constructor(
    public volunteerService: VolunteerService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateConfDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

  onConfirm(): void {

    this.volunteerService.updateVolunteer(this.volunteerUpdateDto).subscribe(
      () => {
        this.snackBar.open("Volonter je izmjenjen.","",{duration: 2000});
      },
      (err) => {
        this.snackBar.open("Došlo je do pogreške.","",{duration: 2000});
          console.log(err);
      });

    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

}
