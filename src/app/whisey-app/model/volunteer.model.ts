import { RegistrationStatus } from './registration-status.model';
import { Role } from './role.model';

export class Volunteer {
    idVolunteer: number;
    firstName: string;
    lastName: string;
    email: string;
    contact: string;
    username: string;
    role: Role;
    registrationStatus: RegistrationStatus;
    password: string;
}