import { Student } from "./student.model";

export class SubscriptionDto {
    idSubscription: number;
    paid: boolean;
    from: string;
    to: string;
    student: Student;
    paidDate: string;
}