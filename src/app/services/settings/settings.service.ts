import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  // tslint:disable-next-line:variable-name
  constructor( @Inject(DOCUMENT) private _document ) {
    this.cargaAjustes();
   }

  guardarAjustes() {
    // Guardamos en el localStorage el objeto 'ajustes', pero hay que convertirlo a string.
    localStorage.setItem('ajustes', JSON.stringify( this.ajustes ));
  }

  cargaAjustes() {
    // Cargamos los ajustes del localSorage, pero al ser string hay que volver a convertirlo en objeto.
    if ( localStorage.getItem('ajustes') ) {
      this.ajustes = JSON.parse( localStorage.getItem('ajustes') );
      this.aplicarTema( this.ajustes.tema );
    } else {
      this.aplicarTema( this.ajustes.tema );
    }
  }

  aplicarTema(tema: string) {

    const url = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute('href', url);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    this.guardarAjustes();
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
