import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { URL_SERVICIOS } from '../../config/config';

import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public usuarioService: UsuarioService
  ) { }

  cargarMedicos() {
    const url = URL_SERVICIOS + '/medico';
    return this.http.get(url)
      .pipe(
        map((resp: any) => {
          this.totalMedicos = resp.total;
          return resp.medicos;
        })
      );
  }

  cargarMedico(id: string) {

    const url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url)
      .pipe(
        map((resp: any) => resp.medico)
      );

  }

  buscarMedicos(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url)
      .pipe(
        map((resp: any) => resp.medicos));
  }

  borrarMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this.usuarioService.token;

    return this.http.delete(url)
      .pipe(
        map(resp => {
          Swal.fire('Médico borrado', 'El médico ha sido eliminado correctamente', 'success');
          return resp;
        })
      );
  }

  guardarMedico(medico: Medico) {
    let url = URL_SERVICIOS + '/medico';

    if (medico.id) {
      // actualizando
      url += '/' + medico.id;
      url += '?token=' + this.usuarioService.token;

      return this.http.put(url, medico)
      .pipe(
        map((resp: any) => {
          Swal.fire('Médico actualizado', medico.nombre, 'success');
          return resp.medico;
        })
        );
      } else {
      // creando
      url += '?token=' + this.usuarioService.token;
      return this.http.post(url, medico)
        .pipe(
          map((resp: any) => {
            Swal.fire('Médico creado', medico.nombre, 'success');
            return resp.medico;
          })
        );
    }
  }

}
