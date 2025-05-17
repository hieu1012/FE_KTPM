import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private apiUrl = 'http://localhost:8086/api/chat';

    constructor(private http: HttpClient) { }

    paymentWithPayos(orderId: Number, amount: Number): Observable<any> {
        const body = {
            orderId: orderId,
            amount: amount
        };
        return this.http.post<any>(this.apiUrl, body);
    }

}