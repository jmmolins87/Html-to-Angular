import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoProducto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargandoProductos = true;
  productos: InfoProducto [] = [];
  productosFiltrado: InfoProducto [] = [];


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

  getProducto( id: string ) {
    return this.http.get(`https://angular-2-html.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto( termino: string ) {
    this.productosFiltrado = this.productos.filter( producto => {
      return true;
    });

    console.log( this.productosFiltrado );
  }

}
