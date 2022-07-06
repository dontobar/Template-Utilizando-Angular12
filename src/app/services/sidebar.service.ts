import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu =[
        {
      titulo:'',
      icono:'',
      submenu:[
        {titulo:'',url:''},
        {titulo:'',url:''},
        {titulo:'',url:''},
        {titulo:'',url:''},
        {titulo:'',url:''}

      ]
    },

    {
      titulo:'',
      icono:'',
      submenu:[
        {titulo:'',url:''},
        {titulo:'',url:''},
        {titulo:'',url:''}


      ]
    }
  ]

  

  cargarMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu')!) || [];
  }



}
