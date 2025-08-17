import { Component } from '@angular/core';
// ...existing code...
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response && response.token) {
          console.log('Login successful:', response.token);
          this.auth.setToken(response.token);
          this.router.navigate(['/users']);
        } else {
          this.error = 'Invalid response from server';
        }
      },
      error: () => this.error = 'Invalid credentials'
    });
  }
}