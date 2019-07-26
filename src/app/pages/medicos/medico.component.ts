import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';

import { MedicoService, HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public medicoService: MedicoService,
    public hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe(params => {
      // tslint:disable-next-line:no-string-literal
      const id = params['id'];
      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }
    });
  }

  ngOnInit() {
    this.hospitalService.cargarHospitales()
      .subscribe(hospitales => this.hospitales = hospitales);

    this.modalUploadService.notificacion
      .subscribe(resp => {
        this.medico.img = resp.medico.img;
      });
  }

  cargarMedico(id: string) {
    this.medicoService.cargarMedico(id)
      .subscribe(medico => {
        this.medico = medico;
        this.medico.hospital = medico.hospital.id;
        this.cambioHospital(this.medico.hospital);
      });
  }

  guardarMedico(f: NgForm) {
    if (f.invalid) {
      return;
    }

    this.medicoService.guardarMedico(this.medico)
      .subscribe(medico => {
        this.medico.id = medico.id;
        this.router.navigate(['/medico', medico.id]);
      });
  }

  cambioHospital(id: string) {
    this.hospitalService.obtenerHospital(id)
      .subscribe(hospital => this.hospital = hospital);
  }

  cambiarFoto() {
    this.modalUploadService.mostrarModal('medicos', this.medico.id);
  }

}
