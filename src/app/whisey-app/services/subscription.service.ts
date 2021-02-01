import { Subscription } from './../model/subscription.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../model/student.model';
import { SubscriptionDto } from '../model/subscriptionDto.model';

const SUBSCRIPTION_URL_GET = 'http://localhost:8080/subscription/get';
const SUBSCRIPTION_URL_POST = 'http://localhost:8080/subscription/add';
const SUBSCRIPTION_URL_DELETE = 'http://localhost:8080/subscription/delete';

@Injectable({
    providedIn: 'root'
  })
  export class SubscriptionService {

    constructor(private http: HttpClient) {}

    public findAll(): Observable<Subscription[]> {
        return this.http.get<Subscription[]>(SUBSCRIPTION_URL_GET);
      }

    public findByStudent(idStudent: string) {
      // const idStudent = student.idStudent;
      return this.http.get<Subscription[]>(SUBSCRIPTION_URL_GET + '/' + idStudent);
    }

    public addSubscription(subscription: Subscription) {
        return this.http.post<Subscription>(SUBSCRIPTION_URL_POST, subscription);
    }

    public deleteSubscription(subscriptionDto: SubscriptionDto) {
        const idSubscription = subscriptionDto.idSubscription;
        return this.http.delete<Subscription>(SUBSCRIPTION_URL_DELETE + '/' + idSubscription);
    }
      
}