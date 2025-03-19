import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User } from '@models/user.model';
import { AuthResponse } from '@models/authResponse.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private authUrl = 'http://localhost:8080/auth/login';
    private registerUrl = 'http://localhost:8080/auth/register';
    private accessToken: string | null = null;
    private user: User | null = null;

    // Subject để thông báo trạng thái đăng nhập cho các component khác theo dõi trả về giá trị boolean 
    private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    // Biến observable để các component khác theo dõi trạng thái đăng nhập
    isLoggedIn$ = this.isLoggedInSubject.asObservable();


    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<AuthResponse>(this.authUrl, { email, password }, { headers })
            .pipe(
                tap(response => {
                    this.accessToken = response.token;
                    this.user = response.user;
                    this.isLoggedInSubject.next(true);
                    // Thông báo đăng nhập thành công 
                    console.log('Đăng nhập thành công!');
                    console.log('Token:', this.accessToken);
                    console.log('User Info:', this.user);
                }),
                catchError(this.handleError<AuthResponse>('login'))
            );
    }

    register(email: string, password: string, fullName: string): Observable<AuthResponse> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<AuthResponse>(this.registerUrl, { email, password, fullName }, { headers })
            .pipe(
                tap(response => {
                    const cuserRegister: User = response.user;
                    console.log('Đăng ký thành công!');
                    console.log('User Info:', cuserRegister);
                }),
                catchError(this.handleError<AuthResponse>('register'))
            );
    }

    logout() {
        this.accessToken = null;
        this.user = null;
        this.isLoggedInSubject.next(false);
        console.log('Đăng xuất thành công!');
        console.log('Token:', this.accessToken);
    }

    getUser(): User | null {
        return this.user;
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(`${operation} failed: ${error.message}`);
            // Thông báo lỗi
            console.log('token:', this.accessToken);
            return of(result as T);
        };
    }




}