import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-demo.component.html',
  styleUrls: ['./auth-demo.component.css']
})
export class AuthDemo {
  username = '';
  password = '';
  mensaje = '';
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  login() {
    this.http.post('http://localhost:3000/api/auth/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token); // VULNERABLE
        this.token = res.token;
        this.mensaje = '✓ Login exitoso como ' + res.username;
      },
      error: (err) => this.mensaje = 'Error: ' + (err.error?.message || 'credenciales inválidas')
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.token = null;
    this.mensaje = 'Sesión cerrada';
  }

  verToken() {
    this.mensaje = `Token almacenado en localStorage:\n${this.token}\n\nEsto es VULNERABLE a ataques XSS`;
  }
}