import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-validation-demo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './validation-demo.component.html',
})
export class ValidationDemoComponent {
  username = '';
  result = '';
  message = '';
  isLoading = false;
  savedResults: any[] = [];
  method: 'vulnerable' | 'secure' = 'secure';
  sanitizationInfo: any = null;

  constructor(private http: HttpClient) {}

  submitInsecure() {
    this.result = `Hola ${this.username}`;
    this.message = '';
    
    // Además de mostrar el saludo, busca en la BD --- comentada para que no muestre los resultados automáticamente
    //this.searchInDatabase();
  }

  saveToDatabase() {
    if (!this.username.trim()) {
      this.message = '❌ Por favor ingresa un valor para guardar';
      return;
    }

    this.isLoading = true;
    this.message = '';
    this.sanitizationInfo = null;

    this.http.post('http://localhost:3000/api/validation/save', {
      username: this.username.trim(),
      data: this.result || this.username.trim(),
      method: this.method
    }).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        const methodText = this.method === 'vulnerable' ? '⚠️ VULNERABLE' : '✅ SEGURO';
        this.message = `${methodText} - Guardado`;
        
        // Mostrar diferencia entre original y sanitizado
        this.sanitizationInfo = {
          original: res.originalUsername,
          sanitized: res.sanitizedUsername,
          changed: res.originalUsername !== res.sanitizedUsername
        };
      },
      error: (err) => {
        this.isLoading = false;
        this.message = `❌ Error: ${err.error?.message || 'No se pudo guardar'}`;
      }
    });
  }

  searchInDatabase() {
    if (!this.username.trim()) {
      this.message = '❌ Por favor ingresa un valor a buscar';
      return;
    }

    this.isLoading = true;
    this.message = '';

    this.http.get(`http://localhost:3000/api/validation/search/${encodeURIComponent(this.username.trim())}?method=${this.method}`)
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;
          this.savedResults = res.data || [];
          const methodText = this.method === 'vulnerable' ? '⚠️ VULNERABLE' : '✅ SEGURO';
          this.message = `${methodText} - Se encontraron ${res.count} resultados`;
        },
        error: (err) => {
          this.isLoading = false;
          this.savedResults = [];
          this.message = `${err.error?.message || 'No hay datos'} (${this.method})`;
        }
      });
  }

  toggleMethod() {
    this.method = this.method === 'vulnerable' ? 'secure' : 'vulnerable';
    this.savedResults = [];
    this.sanitizationInfo = null;
    this.message = `Modo cambiado a: ${this.method === 'vulnerable' ? '⚠️ VULNERABLE' : '✅ SEGURO'}`;
  }
}

