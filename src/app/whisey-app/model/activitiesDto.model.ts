import { Student } from './student.model';
export class ActivitiesDto {
    idAppointment: number;
    appointmentDate: string;
    timeFrom: string;
    timeTo: string;
    student: string;
    reservedHours: number;
    subject: string;
    volunteer: string; 
}