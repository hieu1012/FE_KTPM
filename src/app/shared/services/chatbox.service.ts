import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChatBoxService {
    private apiUrl = '/chat/api/chat';

    constructor(private http: HttpClient) { }


    sendMessage(userId: Number, message: string): Observable<any> {
        const body = {
            userId: userId,
            message: message
        };
        console.log("URL: ", this.apiUrl);
        console.log(body);
        return this.http.post<any>(this.apiUrl, body);
    }


}