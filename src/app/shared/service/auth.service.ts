import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { environment } from '@env/environment';
import { ISafeAny } from '@sharedModule/models/ISafeAny';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
    
    constructor(private httpClient: HttpClient) { }
    

    public getAllUsers(): Observable<ISafeAny> {
        // return this.httpClient.get<ISafeAny>(`${environment.api.getUsers}`);
        return this.httpClient.get<ISafeAny>(`http://localhost:8080/users/all`);
    }

}