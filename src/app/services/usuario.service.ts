import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { tap ,map, catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

import { RegisterForm} from '../interfaces/register.-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

import { Usuario } from '../models/usuario.model';

declare const google:any;
declare const gapi:any;

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2!:any;
  public usuario!:Usuario;

  constructor(private http:HttpClient,
              private router:Router,
              private ngZone: NgZone
              )    { this.googleInit();
            }

  get token():string{
    return localStorage.getItem('token') || '';
  }
  get role():'ADMIN_ROLE' | 'USER_ROLE'{
    return this.usuario.role!;
  }

  get uid():string{
    return this.usuario.uid || '';
  }
  get headers(){
    return{
      headers:{
        'x-token':this.token
      }
    }
  }

  googleInit() {
    
    return new Promise<void>( resolve =>  {
      gapi.load('auth2', () => {
          this.auth2 = gapi.auth2.init({
          client_id: '336467152360-o1sno0tq30qfpjimdc4ck2hnriljrqjr.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    })

  }

  guardarLocalStorage(token:string,menu:any){
    localStorage.setItem('token',token);
    localStorage.setItem('menu',JSON.stringify(menu));
  }


  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    google.accounts.id.revoke(this.usuario.email,()=>{

      this.ngZone.run( () => {
        this.router.navigateByUrl('/login');
      })
      
    })



  }

  validarToken():Observable<boolean>{
    

    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':this.token
      }
    }).pipe(
      map((resp:any) =>{
        const {email,google,nombre,img ='',role,uid } = resp.usuario;
        this.usuario = new Usuario(nombre,email,'',role,google,img,uid);

        this.guardarLocalStorage(resp.token,resp.menu);
        
        return true;
      }),
      catchError(error =>of(false))
    );
  }

  crearUsuario(formData:RegisterForm){
    
    return this.http.post(`${base_url}/usuarios`,formData)
                      .pipe(
                        tap((resp:any) =>{
                          this.guardarLocalStorage(resp.token,resp.menu);
                        })
                      )
  }

  actualizarPerfil(data:{email:string,nombre:string,role:string}){

    data = {
      ...data,
      role : this.usuario.role!
    }

    return this.http.put(`${base_url}/usuarios/${this.uid}`,data,this.headers);
    
}

  

  login(formData:LoginForm){
    
    return this.http.post(`${base_url}/login`,formData)
                .pipe(
                  tap((resp:any) =>{
                    this.guardarLocalStorage(resp.token,resp.menu);
                  })
                )
  }

  loginGoogle(token:string){
    return this.http.post(`${base_url}/login/google`,{token})
      .pipe(
        tap ((resp:any) =>{
          this.guardarLocalStorage(resp.token,resp.menu);
        })
      )
  }


  cargarUsuarios(desde: number = 0){
    const url= `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<{total:number,usuario:Usuario[]}>(url,this.headers)
            .pipe(
              map(resp =>{
                  const usuarios = resp.usuario.map(
                    user => new Usuario(user.nombre,user.email,'',user.role,user.google,user.img,user.uid)
                  );
                  
                return{
                  total:resp.total,
                  usuarios
                };
              })
            )
   
  }
  eliminarUsuario(usuario:Usuario){
    const url= `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url,this.headers)
  }

  guardarUsuario(usuario:Usuario){

    return this.http.put(`${base_url}/usuarios/${usuario.uid}`,usuario,this.headers);
    
}

}
