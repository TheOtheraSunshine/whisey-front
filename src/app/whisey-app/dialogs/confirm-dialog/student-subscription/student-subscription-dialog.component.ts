import { SubscriptionDto } from './../../../model/subscriptionDto.model';
import { Subscription } from './../../../model/subscription.model';
import { SubscriptionService } from './../../../services/subscription.service';
import { StudentService } from './../../../student/student.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateConfDialogComponent } from '../update-student-dialog/update-conf-dialog.component';
import { Student } from 'src/app/whisey-app/model/student.model';

@Component({
  selector: 'app-student-subscription',
  templateUrl: './student-subscription-dialog.component.html',
  styleUrls: ['./student-subscription-dialog.component.css']
})
export class StudentSubscriptionDialogComponent implements OnInit {

from: Date;
paidDate: Date;
to: Date;
isDisabled: boolean = false;

subscription: Subscription = new Subscription();
subscriptionDto: SubscriptionDto = new SubscriptionDto();

  constructor(
    private subscriptionService: SubscriptionService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateConfDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    this.getSubscription();
  }

  getSubscription() {
    this.subscriptionService.findByStudent(this.data.student.idStudent).subscribe(
    data => {
        this.subscriptionDto = this.customDateConverter(data[0]);
        console.log(data[0]);
        console.log(this.subscriptionDto);
      }
    )
  }

  onConfirm(): void {

      this.subscription.paid = this.isDisabled;
      if(this.from != null) {
        this.subscription.from = this.customDateFormat(this.from);
        let dateTo = new Date(this.from);
        dateTo.setMonth(this.from.getMonth() + 1);
        this.subscription.to = this.customDateFormat(dateTo);
      } else {
        this.subscription.from = null;
        this.subscription.to = null;
      }
      this.subscription.idStudent = this.data.student.idStudent;
      if(this.paidDate != null) {
        this.subscription.paidDate = this.customDateFormat(this.paidDate);
      } else {
        this.subscription.paidDate = null;
      }
      
      this.subscriptionService.addSubscription(this.subscription).subscribe(
        () => {
            this.getSubscription();
            this.snackBar.open("Pretplata je dodana.","",{duration: 2000});
      },
      (err) => {
        this.snackBar.open(err.error,"",{duration: 2000});
          console.log(err);
      });
  }

  reset(subscriptionDto: SubscriptionDto) {
    this.subscriptionService.deleteSubscription(subscriptionDto).subscribe(
      () => {
        this.snackBar.open("Pretplata je resetirana","",{duration: 2000});
        this.getSubscription();
      },
      (err) => {
        this.snackBar.open("Došlo je do pogreške","",{duration: 2000});
        console.log(err);
      }
    )
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

  customDateFormat(date: Date) {
    let day = '';
    let month = '';
    if(date.getDate() < 10) {
      day = '0' + date.getDate().toString(); 
    } else {
      day = date.getDate().toString();
    }
    if((date.getMonth() + 1) < 10) {
      let intDateZero = date.getMonth() + 1;
      month = '0' + intDateZero;
    } else {
      let intDate = date.getMonth() + 1;
      month = '' + intDate;
    }

    const fromDT = date.getFullYear().toString() + '-' + month + '-' + day;
    return fromDT;
  }

  customDateConverter(subscription: any) {
    var dateFrom = subscription.from.substring(0,10);
    dateFrom = dateFrom.substring(8,10) + '.' + dateFrom.substring(5,7) + '.' + dateFrom.substring(0,4);

    var dateTo = subscription.to.substring(0,10);
    dateTo = dateTo.substring(8,10) + '.' + dateTo.substring(5,7) + '.' + dateTo.substring(0,4);

    var paidDate = '';
    if(subscription.paidDate != null) {
      paidDate = subscription.paidDate.substring(0,10);
      paidDate = paidDate.substring(8,10) + '.' + paidDate.substring(5,7) + '.' + paidDate.substring(0,4);
    }

    var returnSubDto = new SubscriptionDto();
    returnSubDto.idSubscription = subscription.idSubscription;
    returnSubDto.paid = subscription.paid;
    returnSubDto.from = dateFrom;
    returnSubDto.to = dateTo;
    returnSubDto.student = subscription.student;
    returnSubDto.paidDate = paidDate;

    return returnSubDto;
  }

}
