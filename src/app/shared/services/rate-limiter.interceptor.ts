import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';

interface RequestLog {
    timestamp: number;
    requestCount: number; // đếm số lần gửi thật sự
    retryCount: number;   // đếm số lần retry do 429
}

@Injectable()
export class RateLimiterInterceptor implements HttpInterceptor {
    private requestQueue: Map<string, RequestLog> = new Map();

    private readonly MAX_REQUESTS_PER_ENDPOINT = 100;
    private readonly TIME_WINDOW_MS = 60000;
    private readonly MAX_RETRY_ATTEMPTS = 3;
    private readonly RETRY_DELAY_MS = 1000;

    constructor(private alertService: AlertService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const key = `${request.method}-${request.url}`;
        const now = Date.now();

        const queueItem = this.requestQueue.get(key);

        // Nếu chưa có log → khởi tạo
        if (!queueItem) {
            this.requestQueue.set(key, { timestamp: now, requestCount: 1, retryCount: 0 });
        } else {
            if (now - queueItem.timestamp < this.TIME_WINDOW_MS) {
                // Trong khoảng giới hạn
                if (queueItem.requestCount >= this.MAX_REQUESTS_PER_ENDPOINT) {
                    const remaining = Math.ceil((this.TIME_WINDOW_MS - (now - queueItem.timestamp)) / 1000);
                    this.alertService.show(
                        `⚠️ Bạn đã gửi ${queueItem.requestCount} yêu cầu đến ${request.url} trong ${this.TIME_WINDOW_MS / 1000}s.\n` +
                        `Hãy chờ ${remaining}s rồi thử lại.`
                    );
                    return throwError(() => new Error(`Rate limit exceeded for ${key}`));
                } else {
                    queueItem.requestCount++;
                }
            } else {
                // Reset lại bộ đếm sau TIME_WINDOW
                this.requestQueue.set(key, { timestamp: now, requestCount: 1, retryCount: 0 });
            }
        }

        return next.handle(request).pipe(
            catchError((error) => this.handleError(error, request, next, key))
        );
    }

    private handleError(
        error: any,
        request: HttpRequest<unknown>,
        next: HttpHandler,
        key: string
    ): Observable<HttpEvent<unknown>> {
        if (error instanceof HttpErrorResponse && error.status === 429) {
            const now = Date.now();
            const queueItem = this.requestQueue.get(key) || { timestamp: now, requestCount: 0, retryCount: 0 };

            if (queueItem.retryCount < this.MAX_RETRY_ATTEMPTS) {
                queueItem.retryCount++;
                this.requestQueue.set(key, queueItem);

                const delay = this.RETRY_DELAY_MS * queueItem.retryCount;
                this.alertService.show(
                    `🚫 Server trả về lỗi 429 cho ${request.url}.\n` +
                    `Đang thử lại (lần ${queueItem.retryCount}/${this.MAX_RETRY_ATTEMPTS}) sau ${delay / 1000}s...`
                );

                return timer(delay).pipe(
                    mergeMap(() => next.handle(request))
                );
            } else {
                this.alertService.show(
                    `❌ Không thể thực hiện yêu cầu đến ${request.url} sau ${this.MAX_RETRY_ATTEMPTS} lần thử lại.\n` +
                    `Vui lòng thử lại sau.`
                );
            }
        }

        return throwError(() => error);
    }
}
