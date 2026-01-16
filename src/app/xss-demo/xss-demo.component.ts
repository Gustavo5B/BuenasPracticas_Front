import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-xss-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './xss-demo.component.html',
  styleUrls: ['./xss-demo.component.css']
})
export class XssDemo {
  comentario = '';
  comentariosVulnerables: string[] = [];
  comentariosSegros: SafeHtml[] = [];

  constructor(private sanitizer: DomSanitizer) {}


agregarVulnerable() {
  if (this.comentario.trim()) {
    this.comentariosVulnerables.push(this.comentario);
    
    // ❌ VULNERABLE: innerHTML directo (ESLint lo detectará)
    const container = document.getElementById('vulnerable-output');
    if (container) {
      container.innerHTML = this.comentario;  // ← no-unsanitized/property
    }
    
    this.comentario = '';
  }
}

/*
agregarInsercion() {
  if (this.comentario.trim()) {
    //sanitizamos
    const limpio = this.sanitizer.sanitize(1, this.comentario) || '';  
    //sanitizamos el comentario antes de guardarlo
    this.comentariosVulnerables.push(limpio); 
    
    //  ESLint da error porque 'innerHTML' es prohibido.
    //const container = document.getElementById('vulnerable-output');
    //if (container) {
    //    container.innerHTML = limpio; 
    //}
    
    this.comentario = '';
  }
}
*/


  agregarSeguro() {
    if (this.comentario.trim()) {
      this.comentariosSegros.push(this.sanitizer.sanitize(1, this.comentario) || '');
      this.comentario = '';
    }
  }

  limpiar() {
    this.comentariosVulnerables = [];
    this.comentariosSegros = [];
    this.comentario = '';
  }
}