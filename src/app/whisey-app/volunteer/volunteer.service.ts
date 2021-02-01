import { VolunteerDto } from './../model/volunteer-dto';
import { Volunteer } from './../model/volunteer.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VolunteerUpdateDto } from '../model/volunteer-update-dto.model';

const VOLUNTEER_URL = 'http://localhost:8080/volunteer/get';
const VOLUNTEER_URL_DELETE = "http://localhost:8080/volunteer/delete";
const VOLUNTEER_URL_POST = "http://localhost:8080/register";
const VOLUNTEER_URL_PUT = "http://localhost:8080/volunteer/update";
const VOLUNTEER_URL_GET_WAITING = 'http://localhost:8080/volunteer/getWaiting';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(VOLUNTEER_URL);
  }

  public findWaiting(): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(VOLUNTEER_URL_GET_WAITING);
  }

  public deleteVolunteer(volunteer: Volunteer | string): Observable<Volunteer> {
    const idVolunteer = typeof volunteer == 'string' ? volunteer : volunteer.idVolunteer;

    return this.http.delete<Volunteer>(VOLUNTEER_URL_DELETE + '/' + idVolunteer);
  }

  public addVolunteer(volunteerDto: VolunteerDto) {
    return this.http.post<VolunteerDto>(VOLUNTEER_URL_POST, volunteerDto);
  }

  public  updateVolunteer(volunteerUpdateDto: VolunteerUpdateDto) {
    const idVolunteer = volunteerUpdateDto.idVolunteer;
    return this.http.put<Volunteer>(VOLUNTEER_URL_PUT + '/' + idVolunteer, volunteerUpdateDto);
  }

}
