import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // <-- IMPORTANTE
import { ProductsService, Producto } from '../products.service';

@Component({
  selector: 'app-products-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // <-- lo agregamos aquí
  templateUrl: './products-demo.component.html',
})
export class ProductsDemoComponent implements OnInit {
  productos: Producto[] = [];
  nuevoProducto: Producto = { nombre: '', descripcion: '', precio: 0, stock: 0 };

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productsService.getProductos().subscribe(data => this.productos = data);
  }

  agregarProducto() {
    if (!this.nuevoProducto.nombre || this.nuevoProducto.precio == null) return;

    this.productsService.addProducto(this.nuevoProducto).subscribe(() => {
      this.nuevoProducto = { nombre: '', descripcion: '', precio: 0, stock: 0 };
      this.cargarProductos();
    });
  }
}
