import { BehaviorSubject, Observable } from 'rxjs';
import { Volunteer } from './../whisey-app/model/volunteer.model';
import {Injectable, OnInit} from '@angular/core';

const CURRENT_USER = 'currentUser';
const CREDENTIALS = 'credentials';
const EMPTY_STRING = '';
const ADMIN = 'Admin';

@Injectable()
export class AuthenticationService implements OnInit {

    isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    currentUser: BehaviorSubject<Volunteer>

    ngOnInit(): void {
        this.isAuthenticated = new BehaviorSubject<boolean>(false);
    }
    
    getCurrentUser(): Observable<Volunteer> {
        this.currentUser.next(JSON.parse(localStorage.getItem(CURRENT_USER)));
        return this.currentUser;
    }

    setCredentials(username: string, password: string) {
        localStorage.setItem(CREDENTIALS, JSON.stringify({
            username: username,
            password: btoa(password)
        }))
        console.log(this.getCredentials());
    }

    getCredentials() {
        let credentials = {username: EMPTY_STRING, password: EMPTY_STRING};
        credentials = JSON.parse(localStorage.getItem(CREDENTIALS))

        if(credentials != null) {
            credentials.password = atob(credentials.password);
        }

        if(credentials == null) {
            credentials = {username: EMPTY_STRING, password: EMPTY_STRING}
        }

        return credentials;
    }

    deleteCredentials() {
        //this.currentUser.next(null);
        localStorage.removeItem(CURRENT_USER);
        localStorage.removeItem(CREDENTIALS);
        console.log(this.getCredentials());
    }

    authenticate() {
        if (localStorage.getItem(CURRENT_USER)) {
               this.isAuthenticated.next(true);
        } else {
               this.isAuthenticated.next(false);
        }
    }

    getIsAuthenticated(): Observable<boolean> {
        this.authenticate();
        return this.isAuthenticated.asObservable();
    }

    getRole(): any {
        if (localStorage.getItem(CURRENT_USER)) {
            return localStorage.getItem(CURRENT_USER).includes(ADMIN);
        }
   }
}