import { Subscription } from './../../model/subscription.model';
import { StudentSubscriptionDialogComponent } from './student-subscription/student-subscription-dialog.component';
import { Student } from './../../model/student.model';
import { ConfirmDialogComponent } from './../../dialogs/confirm-dialog/delete-student-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { UpdateConfDialogComponent } from './update-student-dialog/update-conf-dialog.component';
import { Volunteer } from '../../model/volunteer.model';
import { UpdateVolunteerDialogComponent } from './update-volunteer-dialog/update-volunteer-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialogDelete(name: string) {
    return this.dialog.open(ConfirmDialogComponent, {
      data: name
    })
  }

  openConfirmDialogUpdateStudent(student: Student) {
    return this.dialog.open(UpdateConfDialogComponent, {
        data: student
    });
  }

  openConfirmDialogUpdateVolunteer(volunteer: Volunteer) {
    return this.dialog.open(UpdateVolunteerDialogComponent, {
        data: volunteer
    });
  }

  openConfirmDialogSubscription(student: Student) {
    return this.dialog.open(StudentSubscriptionDialogComponent, {
        data: {
          student
        } 
    })
  }

}
