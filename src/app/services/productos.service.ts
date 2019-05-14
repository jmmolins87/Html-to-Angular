import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoProducto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargandoProductos = true;
  productos: InfoProducto[] = [];

  constructor( private http: HttpClient ) {
    this.cargarProductos();
  }

  private cargarProductos() {
    this.http.get('https://angular-2-html.firebaseio.com/productos_idx.json')
        .subscribe ( ( respuestaProductos: InfoProducto[] ) => {
          this.productos = respuestaProductos;
          this.cargandoProductos = false;
        });
  }

}
