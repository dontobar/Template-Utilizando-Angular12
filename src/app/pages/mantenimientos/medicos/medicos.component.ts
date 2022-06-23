import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay } from "rxjs/operators";
import { Subscription } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit,OnDestroy {

  public cargando:boolean = true;
  public medicos:Medico[]=[];
  private imgSubs!: Subscription;

  constructor( private medicoService:MedicoService,
              private busquedasService:BusquedasService,
              private modalService:ModalImagenService) { }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.modalService.nuevaImagen
    .pipe(delay(100))
    .subscribe( img => this.cargarMedicos());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }
  

  cargarMedicos(){
    this.cargando = true;

    this.medicoService.cargarMedicos()
      .subscribe(medicos =>{
        this.cargando = false
        this.medicos = medicos
      })
  }

  buscar(termino:string){

    if(termino.length === 0){
      return this.cargarMedicos();
    }

    this.busquedasService.buscar('medicos',termino)
      .subscribe(resultados =>{
        this.medicos= resultados
      })
  }

  abrirModal(medico:Medico){
    this.modalService.abrirModal('medicos',medico._id,medico.img);
  }

borrarMedico(medico:Medico){
  Swal.fire({
    title: '¿Borrar medico?',
    text: `Esta a punto de borrar a ${medico.nombre}`, 
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si,Borrarlo!'
  }).then((result) => {
    if (result.value) {

     this.medicoService.borrarMedico(medico._id!)
      .subscribe(resp =>{

        this.cargarMedicos();

        Swal.fire
        ('Usuario borrado',
        `${medico.nombre} fue eliminado correctamente`,
        `success`
        );

      })
      }
    })
  }
}
