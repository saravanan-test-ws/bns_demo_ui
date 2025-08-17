
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/authenticate`;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    // Expecting a JSON response with a 'token' property
    return this.http.post<{ message: string; token: string }>(this.apiUrl, { username, password });
  }

  setToken(token: string) {
    localStorage.setItem('jwt', token);
  }

  getToken() {
    return localStorage.getItem('jwt');
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}