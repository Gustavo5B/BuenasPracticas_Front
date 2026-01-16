import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-error-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './error-demo.component.html',
  styleUrls: ['./error-demo.component.css']
})
export class ErrorDemo {
  productoId: number = 99999; // ID que no existe
  errorMostrado: string = '';

  constructor(private http: HttpClient) {}

  buscarProducto() {
    this.errorMostrado = '';
    
    this.http.get(`http://localhost:3000/api/productos/${this.productoId}`).subscribe({
      next: (data: any) => {
        this.errorMostrado = `✅ Producto encontrado: ${JSON.stringify(data, null, 2)}`;
      },
      error: (error) => {
        // ❌ VULNERABLE: Muestra TODO el error al usuario
        this.errorMostrado = `
❌ ERROR COMPLETO DEL SERVIDOR:

${JSON.stringify(error.error, null, 2)}

Status: ${error.status}
URL: ${error.url}
Message: ${error.message}
        `;
      }
    });
  }
}