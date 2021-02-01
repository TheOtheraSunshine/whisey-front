import { StatisticsComponent } from './whisey-app/statistics/statistics.component';
import { StudentsFlowComponent } from './whisey-app/statistics/students-flow/students-flow.component';
import { StudentComponent } from './whisey-app/student/student.component';
import { NgModule} from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { WhiseyAppComponent} from './whisey-app/whisey-app.component';
import { VolunteerComponent } from './whisey-app/volunteer/volunteer.component';
import { AuthRouteGuardService } from './security/auth-route-guard';

const routes: Routes = [
  { path: '', component: HomepageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'whisey-app', component: WhiseyAppComponent, 
    canActivate: [AuthRouteGuardService],},
  { path: 'whisey-app/students', component: StudentComponent, 
    canActivate: [AuthRouteGuardService]},
  { path: 'whisey-app/volunteers', component: VolunteerComponent, 
    canActivate: [AuthRouteGuardService]},
  { path: 'whisey-app/statistics', component: StatisticsComponent, 
    canActivate: [AuthRouteGuardService]}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
