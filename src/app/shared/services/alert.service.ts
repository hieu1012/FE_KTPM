// src/app/services/alert.service.ts
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    show(message: string): void {
        alert(message); // Có thể thay bằng Toastr hoặc MatSnackBar nếu cần
    }
}
