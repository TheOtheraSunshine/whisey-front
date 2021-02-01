import { VolunteerDto } from './../whisey-app/model/volunteer-dto';
import { VolunteerService } from './../whisey-app/volunteer/volunteer.service';
import { Role } from './../whisey-app/model/role.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../security/authentication.service';
import { Volunteer } from '../whisey-app/model/volunteer.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import { User } from '../whisey-app/model/user.model';

const EMPTY_STRING = '';
const RESPONSE = 'response';
const ERROR_USER_PASS_MEASSAGE = 'Korisničko ime ili lozinka nisu ispravni!';
const SUCCESFUL_LOGIN_MESSAGE = 'Prijava je uspješna.'
const APPROVED = 'Approved';
const CURRENT_USER = 'currentUser';
const LOGIN_URL = 'http://localhost:8080/login';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  user: User = new User();

  volunteer: VolunteerDto = new VolunteerDto();

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar,
    private volunteerService: VolunteerService) { }

  login() {

    this.authenticationService.setCredentials(this.user.username, this.user.password);

    this.httpClient.get(LOGIN_URL, {observe: RESPONSE}).subscribe((response: HttpResponse<Volunteer>) => {

      if(response.status != 200) {
          this.snackBar.open(ERROR_USER_PASS_MEASSAGE, EMPTY_STRING, {duration: 2000});
          this.authenticationService.deleteCredentials();
      }

      if(response.status == 200) {
          if(response.body.registrationStatus.value == APPROVED) {
              this.snackBar.open(SUCCESFUL_LOGIN_MESSAGE, EMPTY_STRING, {duration: 2000});

              localStorage.setItem(CURRENT_USER, JSON.stringify(response.body));
              this.authenticationService.authenticate();

              this.router.navigateByUrl('/whisey-app');
          }
      }

    }, (error) => {
      this.snackBar.open(ERROR_USER_PASS_MEASSAGE, EMPTY_STRING, { duration: 2000});
      this.authenticationService.deleteCredentials();
    });
  }

  register() {
      this.volunteerService.addVolunteer(this.volunteer).subscribe(
        () => {
            this.snackBar.open("Registracija je uspješna.","",{duration: 2000});
      })
  }

}
