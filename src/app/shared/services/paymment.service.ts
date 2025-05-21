import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private apiUrl = '/order/api/payments/payos';
    private apiUrlStatus = '/order/api/payments/status';
    constructor(private http: HttpClient) { }

    paymentWithPayos(orderId: any, amount: any): Observable<any> {
        const body = {
            orderId: orderId,
            amount: amount
        };
        return this.http.post<any>(this.apiUrl, body);
    }

    updateStatusPayment(orderCode: any, status: any): Observable<any> {
        const formattedStatus = status.toUpperCase();

        const body = {
            orderCode: orderCode,
            status: formattedStatus
        };

        console.log('Sending request to update payment status:', body);

        // Chỉ định responseType là 'text' vì API trả về chuỗi văn bản
        return this.http.post(this.apiUrlStatus, body, { responseType: 'text' });
    }

    getStatusPayment(orderCode: any): Observable<any> {
        // Chỉ định responseType là 'text' tương tự như updateStatusPayment
        return this.http.get(`${this.apiUrlStatus}/${orderCode}`, { responseType: 'text' });
    }
}