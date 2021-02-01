import { Time } from '@angular/common';
import { Student } from './student.model';
import { Subject } from './subject.model';
import { Volunteer } from './volunteer.model';

export class ActivityDto {
    idSubject: number;
    idStudent: number;
    idVolunteer: number;
    reservedHours: number;
    dateFrom: string;
    dateTo: string;
    idAppointmentStatus: number;
}