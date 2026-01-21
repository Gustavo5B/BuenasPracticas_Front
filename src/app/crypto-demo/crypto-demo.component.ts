import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crypto-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crypto-demo.component.html',
  styleUrls: ['./crypto-demo.component.css']
})
export class CryptoDemo {
  password = '';
  resultado = '';
  

  constructor(private http: HttpClient) {}

  // VULNERABLE: texto plano
  guardarTextoPlano() {
    this.http.post('http://localhost:3000/api/crypto/plain', { password: this.password })
      .subscribe({
        next: (res: any) => {
          this.resultado = `Contraseña guardada en texto plano:\n${res.stored}`;
        },
        error: () => this.resultado = 'Error al guardar'
      });
  }

  // VULNERABLE: MD5
  guardarMD5() {
    this.http.post('http://localhost:3000/api/crypto/md5', { password: this.password })
      .subscribe({
        next: (res: any) => {
          this.resultado = `Contraseña con MD5 (inseguro):\n${res.hash}\n\nMD5 es vulnerable a ataques de diccionario`;
        },
        error: () => this.resultado = 'Error al guardar'
      });
  }

  // SEGURO: bcrypt
  guardarBcrypt() {
    this.http.post('http://localhost:3000/api/crypto/bcrypt', { password: this.password })
      .subscribe({
        next: (res: any) => {
          this.resultado = `Contraseña hasheada con bcrypt:\n${res.hash}\n\nEsto es SEGURO`;
        },
        error: () => this.resultado = 'Error al guardar'
      });
  }
}