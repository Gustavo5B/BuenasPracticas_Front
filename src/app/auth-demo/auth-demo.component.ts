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
  esModoSeguro = false;

  constructor(private http: HttpClient) {}

  cambiarModo(modo: boolean) {
    this.esModoSeguro = modo;
    this.logout();
    this.mensaje = `Cambiado a Modo ${modo ? 'Seguro' : 'Inseguro'}`;
  }

  login() {
  const endpoint = this.esModoSeguro ? '/api/auth/login-safe' : '/api/auth/login';
  
  this.http.post(`http://localhost:3000${endpoint}`, {
    username: this.username,
    password: this.password
  }, { withCredentials: true })
  .subscribe({
    next: (res: any) => {
      if (this.esModoSeguro) {
        localStorage.removeItem('token');
        this.token = 'Protegido en Cookie'; 
      } else {
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.token = res.token;
        }
      }
      this.mensaje = `✓ Login exitoso como ${res.username}`;
    },
    error: (err) => this.mensaje = 'Error: ' + (err.error?.message || 'Fallo de conexión')
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
