import { Component, OnInit } from '@angular/core';

// LLamamos a un script externo en un plugin fuera de angular.
declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
