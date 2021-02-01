import { VolunteerDialogComponent } from './whisey-app/dialogs/volunteer-dialog/volunteer-dialog.component';
import { VolunteerTableComponent } from './whisey-app/volunteer/table/volunteer-table.component';
import { StudentTableComponent } from './whisey-app/student/table/student-table.component';
import { MatDialogModule, _MatDialogContainerBase } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpInterceptorService } from './security/http-interceptor.service';
import { AuthenticationService } from './security/authentication.service';
import { AuthRouteGuardService } from './security/auth-route-guard';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WhiseyAppComponent } from './whisey-app/whisey-app.component';
import { StudentComponent } from './whisey-app/student/student.component';
import { MainNavComponent } from './whisey-app/nav-bar/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { VolunteerComponent } from './whisey-app/volunteer/volunteer.component';
import { StudentDialogComponent } from './whisey-app/dialogs/student-dialog/student-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ConfirmDialogComponent } from './whisey-app/dialogs/confirm-dialog/delete-student-dialog/confirm-dialog.component';
import { AddStudentComponent } from './whisey-app/student/add-student/add-student.component';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddVolunteerComponent } from './whisey-app/volunteer/add-volunteer/add-volunteer.component'
import { UpdateConfDialogComponent } from './whisey-app/dialogs/confirm-dialog/update-student-dialog/update-conf-dialog.component';
import { UpdateVolunteerDialogComponent } from './whisey-app/dialogs/confirm-dialog/update-volunteer-dialog/update-volunteer-dialog.component';
import { MainActivitiesComponent } from './whisey-app/main-activities/main-activities.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker'
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { StudentSubscriptionDialogComponent } from './whisey-app/dialogs/confirm-dialog/student-subscription/student-subscription-dialog.component';
import { StudentsFlowComponent } from './whisey-app/statistics/students-flow/students-flow.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { StatisticsComponent } from './whisey-app/statistics/statistics.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    WhiseyAppComponent,
    StudentComponent,
    MainNavComponent,
    VolunteerComponent,
    StudentDialogComponent,
    StudentTableComponent,
    ConfirmDialogComponent,
    VolunteerTableComponent,
    VolunteerDialogComponent,
    AddStudentComponent,
    AddVolunteerComponent,
    UpdateConfDialogComponent,
    UpdateVolunteerDialogComponent,
    MainActivitiesComponent,
    StudentSubscriptionDialogComponent,
    StudentsFlowComponent,
    StatisticsComponent
  ],
  entryComponents: [
    StudentDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatInputModule,
    MatTabsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    HighchartsChartModule,
    MatTooltipModule,
    MatMenuModule
  ],
  providers: [
    AuthRouteGuardService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale('hr'); // DD. MM. YYYY.
  }

 }
