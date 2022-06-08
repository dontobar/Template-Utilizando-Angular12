import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private usuarioService:UsuarioService,
              private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){

    return this.usuarioService.validarToken()
      .pipe(
        tap(estaAutenticado =>{
          if(!estaAutenticado){
            this.router.navigateByUrl('/login');
          }
        })
      )
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]) {
    return true;
  }
}
