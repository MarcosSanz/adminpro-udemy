import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

// LLamamos a un script externo en un plugin fuera de angular para inicializar plugins.
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;

  constructor(
    public router: Router,
    public usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    init_plugins();

    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  ingresar(forma: NgForm) {

    if (forma.invalid) {
      return;
    }

    const usuario = new Usuario(null, forma.value.email, forma.value.password);
    this.usuarioService.login(usuario, forma.value.recuerdame)
      .subscribe(correcto => this.router.navigate(['/dashboard']));
  }

}
