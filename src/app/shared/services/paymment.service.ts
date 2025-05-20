import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private apiUrl = '/order/api/payments/payos';

    constructor(private http: HttpClient) { }

    paymentWithPayos(orderId: any, amount: any): Observable<any> {
        const body = {
            orderId: orderId,
            amount: amount
        };
        return this.http.post<any>(this.apiUrl, body);
    }
}