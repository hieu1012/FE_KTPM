import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ManufactureService {
    private apiUrl = 'http://localhost:8089/api/manufacture';

    constructor(private http: HttpClient) { }

    getAllManufactures(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}