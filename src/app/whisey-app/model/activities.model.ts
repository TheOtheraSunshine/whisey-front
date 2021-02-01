import { AppointmentStatus } from './appointment-status.model';
import { Student } from './student.model';
import { Subject } from './subject.model';
import { Volunteer } from './volunteer.model';
export class Activities {
    idAppointment: number;
    dateFrom: string;
    dateTo: string;
    subject: Subject;
    appointmentStatus: AppointmentStatus
    volunteer: Volunteer;
    students: Student[];
    reservedHours: number;
}