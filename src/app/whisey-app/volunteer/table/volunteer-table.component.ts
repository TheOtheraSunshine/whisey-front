import { VolunteerDialogComponent } from './../../dialogs/volunteer-dialog/volunteer-dialog.component';
import { VolunteerService } from './../volunteer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Volunteer } from '../../model/volunteer.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogService } from '../../dialogs/confirm-dialog/confirm-dialog.service';

@Component({
    selector: 'app-volunteer-table',
    templateUrl: './volunteer-table.component.html',
    styleUrls: ['./volunteer-table.component.css']
  })
  export class VolunteerTableComponent implements OnInit {

    volunteer: Volunteer[];
    searchKey: string;

    displayedColumns: string[] = ['firstName', 'lastName','edit', 'info','delete'];
    dataSource: MatTableDataSource<Volunteer>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
      private volunteerService: VolunteerService,
      private snackBar: MatSnackBar,
      private dialog: MatDialog,
      private confirmDialog: ConfirmDialogService
    ){};

    ngOnInit(): void {
        this.getVolunteer();
    }

    deleteVolunteer(volunteer:Volunteer) {
      this.volunteerService.deleteVolunteer(volunteer).subscribe(
        () => {
          this.snackBar.open("Volonter je obrisan.","",{duration: 2000});
          this.getVolunteer();
        },
        (err) => {
          this.snackBar.open("Došlo je do pogreške.","",{duration: 2000});
          console.log(err);
        }
      )
    }

    getVolunteer() {
      this.volunteerService.findAll().subscribe(data => {
        this.volunteer = data;
        this.dataSource = new MatTableDataSource(this.volunteer);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    }

    openDialog(volunteer: Volunteer) {
      this.dialog.open(VolunteerDialogComponent, {
      data: {
        firstName: volunteer.firstName,
        lastName: volunteer.lastName,
        email: volunteer.email,
        contact: volunteer.contact,
        username: volunteer.username,
        role: volunteer.role.value,
        registrationStatus: volunteer.registrationStatus.value,
      }
    });
  }

  openConfirmDialogDelete(volunteer: Volunteer) {
    this.confirmDialog.openConfirmDialogDelete('volontera')
    .afterClosed().subscribe(res => {
      if(res) {
        this.deleteVolunteer(volunteer);
      }
    })
  }

  openConfirmDialogUpdate(volunteer: Volunteer) {
    this.confirmDialog.openConfirmDialogUpdateVolunteer(volunteer)
    .afterClosed().subscribe(res => {
      if(res) {
        this,this.getVolunteer();
      }
    })
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
  }

  }