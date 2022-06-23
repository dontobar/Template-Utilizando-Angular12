import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from "rxjs/operators";
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';
import { HospitalService } from '../../../services/hospital.service';


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit,OnDestroy {

  public hospitales:Hospital[]=[];
  public hospitalesTemp:Hospital[]=[];
  public cargando:boolean = true;
  private imgSubs!: Subscription;

  constructor(private hospitalService:HospitalService,
              private modalService:ModalImagenService,
              private busquedasService:BusquedasService) { }

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.modalService.nuevaImagen
    .pipe(delay(100))
    .subscribe( img => this.cargarHospitales());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarHospitales(){
    this.cargando = true;

    this.hospitalService.cargarHospitales()
      .subscribe(hospitales =>{
        this.cargando = false
        this.hospitales = hospitales
      })
  }
  guardarCambios(hospital:Hospital){

    this.hospitalService.actualizarHospital(hospital._id!,hospital.nombre)
      .subscribe(resp =>{
        this.cargarHospitales()
        Swal.fire('Actualizado',hospital.nombre,'success');
      })

  }

  eliminarHospital(hospital:Hospital){

    this.hospitalService.borrarHospital(hospital._id!)
      .subscribe(resp =>{
        this.cargarHospitales()
        Swal.fire('Borrado',hospital.nombre,'success');
      })

  }

  async abrirSweetAlert(){
    const {value =''} = await Swal.fire<string>({
      title:'Crear Hospital',
      text:'Ingrese el nombre del nuevo Hospital',
      input: 'text',
      inputPlaceholder: 'nombre del hospital',
      showCancelButton: true
    })
    if(value!.trim().length >0){
      this.hospitalService.crearHospital(value!)
        .subscribe(resp =>{
          this.cargarHospitales()
        })
    }
  }
  abrirModal(hospital:Hospital){
    this.modalService.abrirModal('hospitales',hospital._id,hospital.img);
  }

  buscar(termino:string){

    if(termino.length === 0){
      return this.cargarHospitales();
    }

    this.busquedasService.buscar('hospitales',termino)
      .subscribe(resultados =>{
        this.hospitales= resultados
      })
  }
}


