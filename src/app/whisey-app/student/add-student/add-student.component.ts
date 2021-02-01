import { StudentService } from './../student.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

const EMPTY_STRING = '';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  studentDto = {
    firstName: EMPTY_STRING,
    lastName: EMPTY_STRING,
    contact: EMPTY_STRING,
    grade: 0,
    school: EMPTY_STRING,
    age: 0
  }

  // firstName = EMPTY_STRING;
  // lastName = EMPTY_STRING;
  // contact = EMPTY_STRING;
  // grade = EMPTY_STRING;
  // school = EMPTY_STRING;
  // age = 0;

  constructor(
    private studentService: StudentService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
  }

  addStudent() {
    this.studentService.addStudent(this.studentDto).subscribe(
      () => {
          this.snackBar.open("Učenik je dodan.","",{duration: 2000});
    })
  }

}
