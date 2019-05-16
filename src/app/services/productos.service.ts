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
    return new Promise( ( resolve, reject ) => {
      this.http.get('https://angular-2-html.firebaseio.com/productos_idx.json')
          .subscribe ( ( respuestaProductos: InfoProducto[] ) => {
            this.productos = respuestaProductos;
            this.cargandoProductos = false;
            resolve();
          });
    });
  }

  getProducto( id: string ) {
    return this.http.get(`https://angular-2-html.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto( termino: string ) {
    if ( this.productos.length === 0 ) {
      // Cargar productos
      this.cargarProductos().then( () => {
        // Ejecutar después de cargar los productos
        // Aplicar filtro
        this.filtrarProductos( termino );
      });
    } else {
      // Aplicar filtro
      this.filtrarProductos( termino );
    }
    this.productosFiltrado = this.productos.filter( producto => {
      return true;
    });
  }

  private filtrarProductos( termino: string ) {
    this.productosFiltrado = [];
    termino = termino.toLowerCase();
    this.productos.forEach( producto =>  {
      const tituloLower = producto.titulo.toLowerCase();
      if ( producto.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ) {
        this.productosFiltrado.push( producto );
      }
    });
  }

}
