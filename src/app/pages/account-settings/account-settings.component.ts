import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  constructor( public _ajustes: SettingsService ) { }

  ngOnInit() {
    this.colocarChek();
  }

  cambiarColor( tema: string, link: any ) {
    this.aplicarCheck( link );
    this._ajustes.aplicarTema( tema );
  }

  aplicarCheck( link: any ) {
    const selectores: any = document.getElementsByClassName('selector');
    for (const selector of selectores) {
      selector.classList.remove('working');
    }
    link.classList.add('working');
  }

  colocarChek() {
    const selectores: any = document.getElementsByClassName('selector');
    const tema = this._ajustes.ajustes.tema;
    for (const selector of selectores) {
      if ( selector.getAttribute('data-theme' ) === tema ) {
        selector.classList.add('working');
        break;
      }
    }
  }

}
