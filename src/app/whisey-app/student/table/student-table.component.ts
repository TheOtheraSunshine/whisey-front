import { AuthenticationService } from './../../../security/authentication.service';
import { Subscription } from './../../model/subscription.model';
import { Student } from './../../model/student.model';
import { ConfirmDialogService } from './../../dialogs/confirm-dialog/confirm-dialog.service';
import { StudentService } from '../student.service';
import { OnInit, ViewChild } from '@angular/core';
import {Component } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentDialogComponent } from '../../dialogs/student-dialog/student-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-student-table',
    templateUrl: './student-table.component.html',
    styleUrls: ['./student-table.component.css']
  })
  export class StudentTableComponent implements OnInit {

    students: Student[];
    searchKey: string;

    isAuthenticated: boolean;

    displayedColumns: string[];
    dataSource: MatTableDataSource<Student>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
      private studentService: StudentService,
      private snackBar: MatSnackBar,
      private dialog: MatDialog,
      private confirmDialog: ConfirmDialogService,
      private authenticationService: AuthenticationService
      ){};

    ngOnInit(): void {
      this.isAuthenticated = this.authenticationService.getRole();
      this.setColumns();
      this.getStudents();
    }

    deleteStudent(student: Student) {
      this.studentService.deleteStudent(student).subscribe(
          () => {
              this.snackBar.open("Učenik je obrisan.","",{duration: 2000});
              this.getStudents();
            },
          (err) => {
              this.snackBar.open("Došlo je do pogreške.","",{duration: 2000});
              console.log(err);
          }
        );
      }

      getStudents() {
        this.studentService.findAll().subscribe(data => {
          this.students = data;
          this.dataSource = new MatTableDataSource(this.students);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      }

      updateStudent(student: Student) {
        this.studentService.updateStudent(student).subscribe(
          () => {
            this.snackBar.open("Učenik je izmijenjen.","",{duration: 2000});
          },
          (err) => {
            this.snackBar.open("Došlo je do pogreške.","",{duration: 2000});
              console.log(err);
          });
      }

    openDialog(student: Student) {
      this.dialog.open(StudentDialogComponent, {
      data: {
        firstName: student.firstName,
        lastName: student.lastName,
        contact: student.contact,
        grade: student.grade,
        school: student.school,
        age: student.age
      }
    });
  }

  openConfirmDialogDelete(student: Student) {
    this.confirmDialog.openConfirmDialogDelete('učenika')
    .afterClosed().subscribe(res => {
      if(res) {
        this.deleteStudent(student);
      }
    })
  }

  openConfirmDialogUpdate(student: Student) {
    this.confirmDialog.openConfirmDialogUpdateStudent(student)
    .afterClosed().subscribe(res => {
      if(res) {
        this.getStudents();
      }
    })
  }

  openConfirmDialogSubscription(student: Student) {
    this.confirmDialog.openConfirmDialogSubscription(student);
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
  }

  setColumns() {
    if(this.isAuthenticated) {
      this.displayedColumns  = ['lastName', 'firstName', 'subscription', 'edit','info' ,'delete'];
    } else {
      this.displayedColumns = ['lastName', 'firstName','info'];
    }
    
  }
}