import { Student } from './../../../model/student.model';
import { StudentService } from './../../../student/student.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

const EMPTY_STRING = '';

@Component({
  selector: 'app-update-conf-dialog',
  templateUrl: './update-conf-dialog.component.html',
  styleUrls: ['./update-conf-dialog.component.css']
})
export class UpdateConfDialogComponent implements OnInit {

    studentDto = {
      idStudent: this.data.idStudent,
      firstName: this.data.firstName,
      lastName: this.data.lastName,
      contact: this.data.contact,
      grade: this.data.grade,
      school: this.data.school,
      age: this.data.age
    }

  constructor(
    public studentService: StudentService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateConfDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

    onConfirm(): void {

    this.studentService.updateStudent(this.studentDto).subscribe(
      () => {
        this.snackBar.open("Učenik je izmjenjen.","",{duration: 2000});
      },
      (err) => {
        this.snackBar.open("Došlo je do pogreške.","",{duration: 2000});
          console.log(err);
      });;
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

}
