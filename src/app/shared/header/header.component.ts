import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent  {

  public usuario!:Usuario;

  constructor( private usuarioServicio:UsuarioService) { 

    this.usuario = usuarioServicio.usuario;
  }

  logout(){
    this.usuarioServicio.logout();
  }

}
