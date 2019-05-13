import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';
import { InfoEquipo } from '../interfaces/equipo.interfaces';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina;
  equipo: InfoEquipo;
  dataCargada = false;

  constructor( private http: HttpClient ) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    // Llámamos al archivo JSON
    this.http.get('assets/data/data-pagina.json')
        .subscribe( ( respuestaInfo: InfoPagina ) => {
          this.info = respuestaInfo;
          this.dataCargada = true;
        });
  }

  private cargarEquipo() {
    this.http.get('https://angular-2-html.firebaseio.com/.json')
        .subscribe( (respuestaEquipo: InfoEquipo) => {
          this.equipo = respuestaEquipo;
          console.log( respuestaEquipo );
        });
  }

}
