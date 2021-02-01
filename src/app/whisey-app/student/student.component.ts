import { AuthenticationService } from './../../security/authentication.service';
import { StudentDialogComponent } from './../dialogs/student-dialog/student-dialog.component';
import { Student } from './../model/student.model';
import { StudentService } from './student.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  isAuthenticated: boolean;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authenticationService.getRole();
  }

}
