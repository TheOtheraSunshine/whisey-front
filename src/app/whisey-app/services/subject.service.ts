import { Subject } from './../model/subject.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const SUBJECT_URL_GET = 'http://localhost:8080/subject/get';

@Injectable({
    providedIn: 'root'
  })
  export class SubjectService {

    constructor(private http: HttpClient) {}

    public findAll(): Observable<Subject[]> {
        return this.http.get<Subject[]>(SUBJECT_URL_GET);
      }
      
  }