import { ActivitiesDto } from './../model/activitiesDto.model';
import { AppointmentService } from './../services/appointment.service';
import { ActivityDto } from './../model/activity-dto.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Volunteer } from './../model/volunteer.model';
import { VolunteerService } from './../volunteer/volunteer.service';
import { Subject } from './../model/subject.model';
import { Student } from './../model/student.model';
import { MatInputModule } from '@angular/material/input';
import { StudentService } from './../student/student.service';
import { Activities } from './../model/activities.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatFormFieldControl } from '@angular/material/form-field'
import { SubjectService } from '../services/subject.service';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { Time } from '@angular/common';
import * as moment from 'moment';
import { TimeFormatterPipe } from 'ngx-material-timepicker/src/app/material-timepicker/pipes/time-formatter.pipe';
import { ConfirmDialogService } from '../dialogs/confirm-dialog/confirm-dialog.service';

const RESERVED = 1;
const DONE = 2;

@Component({
  selector: 'app-main-activities',
  templateUrl: './main-activities.component.html',
  styleUrls: ['./main-activities.component.css']
})
export class MainActivitiesComponent implements OnInit {

  activities: Activities[];
  activitiesDto: ActivitiesDto[];
  searchKey: string;
  students: Student[];
  subjects: Subject[];
  volunteers: Volunteer[];

  selectedStudent: Student;
  selectedSubject: Subject;
  selectedVolunteer: Volunteer;
  hours: number;
  appointmentDate: Date;
  selectedTimeFrom: Time;
  selectedTimeTo: Time;

  activityDTO: ActivityDto = new ActivityDto();

  displayedColumns: string[] = ['appointmentDate', 'reservedHours', 'timeFrom','timeTo' ,'studentInfo', 'subject', 'volunteerInfo', 'delete'];
  dataSource: MatTableDataSource<ActivitiesDto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private snackBar: MatSnackBar,
    private studentService: StudentService,
    private subjectService: SubjectService,
    private volunteerService: VolunteerService,
    private appointmentService: AppointmentService,
    private confirmDialog: ConfirmDialogService
  ) { }

  ngOnInit(): void {
    this.getActivities();
    this.getStudents();
    this.getSubjects();
    this.getVolunteers();
  }

  addActivity() {
    this.activityDTO.dateFrom = this.customDateFormat() + ' ' + this.selectedTimeFrom;
    this.activityDTO.dateTo = this.customDateFormat() + ' ' + this.selectedTimeTo;
    this.activityDTO.reservedHours = this.hours;
    this.activityDTO.idSubject = this.selectedSubject.idSubject;
    this.activityDTO.idVolunteer = this.selectedVolunteer.idVolunteer;
    this.activityDTO.idStudent = this.selectedStudent.idStudent;
    this.activityDTO.idAppointmentStatus = DONE;

    this.appointmentService.addActivity(this.activityDTO).subscribe(
      () => {
        this.snackBar.open("Termin je unesen.","",{duration: 2000});
        this.getActivities();
      }
    )
  }

  getActivities() {
      this.appointmentService.findAll().subscribe(data => {
        this.activitiesDto = data;
        this.dataSource = new MatTableDataSource(this.activitiesDto);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
  }

  getStudents() {
    this.studentService.findAll().subscribe(data => {
      this.students = data;
    });
  }

  getSubjects() {
    this.subjectService.findAll().subscribe(data => {
      this.subjects = data;
    })
  }

  getVolunteers() {
    this.volunteerService.findAll().subscribe(data => {
      this.volunteers = data;
    })
  }

  customDateFormat() {
    let day = '';
    let month = '';
    if(this.appointmentDate.getDate() < 10) {
      day = '0' + this.appointmentDate.getDate().toString(); 
    } else {
      day = this.appointmentDate.getDate().toString();
    }
    if((this.appointmentDate.getMonth() + 1) < 10) {
      month = '0' + this.appointmentDate.getMonth() + 1;
    } else {
      let intDate = this.appointmentDate.getMonth() + 1;
      month = '' + intDate;
    }

    const appointmentDate = this.appointmentDate.getFullYear().toString() + '-' + month + '-' + day;
    return appointmentDate;
  }

  deleteAcitvity(activitiesDto: ActivitiesDto) {
    this.appointmentService.deleteActivity(activitiesDto).subscribe(
        () => {
            this.snackBar.open("Termin je obrisan.","",{duration: 2000});
            this.getActivities();
          },
        (err) => {
            this.snackBar.open("Došlo je do pogreške.","",{duration: 2000});
            console.log(err);
        }
      );
    }

  openConfirmDialogDelete(activitiesDto: ActivitiesDto) {
    this.confirmDialog.openConfirmDialogDelete('termin')
    .afterClosed().subscribe(res => {
      if(res) {
        this.deleteAcitvity(activitiesDto);
      }
    })
  }

}
