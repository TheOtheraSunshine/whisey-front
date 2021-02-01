import { ActivityDto } from './../model/activity-dto.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activities } from '../model/activities.model';
import { ActivitiesDto } from '../model/activitiesDto.model';
import { ChartData } from '../model/chart-data.model';

const APPOINTMENT_URL_GET = 'http://localhost:8080/appointment/get';
const APPOINTMENT_URL_POST = 'http://localhost:8080/appointment/add';
const APPOINTMENT_URL_DELETE = 'http://localhost:8080/appointment/delete';
const CHART_DATA_URL_GET = 'http://localhost:8080/appointment/getChartData';

@Injectable({
    providedIn: 'root'
  })
  export class AppointmentService {

    constructor(private http: HttpClient) {}

    public findAll(): Observable<ActivitiesDto[]> {
        return this.http.get<ActivitiesDto[]>(APPOINTMENT_URL_GET);
      }

    public findAllChartData(): Observable<ChartData> {
      return this.http.get<ChartData>(CHART_DATA_URL_GET);
    } 
    
    public addActivity(activityDto: ActivityDto) {
        return this.http.post<ActivityDto>(APPOINTMENT_URL_POST, activityDto);
      }

    public deleteActivity(activitiesDto:ActivitiesDto) {
      const idAppointment = activitiesDto.idAppointment;
      return this.http.delete<ActivitiesDto>(APPOINTMENT_URL_DELETE + '/' + idAppointment);
      }
      
  }