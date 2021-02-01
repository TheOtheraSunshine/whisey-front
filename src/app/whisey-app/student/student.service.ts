import { StudentDto } from './../model/studentDto.model';
import { Student } from './../model/student.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const STUDENT_URL_GET = 'http://localhost:8080/student/get';
const STUDENT_URL_DELETE = 'http://localhost:8080/student/delete';
const STUDENT_URL_POST = 'http://localhost:8080/student/add';
const STUDENT_URL_PUT = 'http://localhost:8080/student/update'

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Student[]> {
    return this.http.get<Student[]>(STUDENT_URL_GET);
  }

  public deleteStudent(student: Student | string): Observable<Student> {
    const idStudent = typeof student == 'string' ? student : student.idStudent;

    return this.http.delete<Student>(STUDENT_URL_DELETE + '/' + idStudent);
    
  } 

  public addStudent(studentDto: StudentDto) {
    return this.http.post<Student>(STUDENT_URL_POST, studentDto);
  }

  public  updateStudent(student: Student) {
    const idStudent = student.idStudent;
    return this.http.put<Student>(STUDENT_URL_PUT + '/' + idStudent, student);
  }

}
