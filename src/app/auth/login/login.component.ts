import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '',[Validators.required,Validators.minLength(6),Validators.email]],
    password: ['',[Validators.required,Validators.minLength(6)]],
    remember:[false]
  });

  constructor(private router:Router,
              private fb:FormBuilder,
              private usuarioService:UsuarioService) { }

  login(){
    this.usuarioService.login(this.loginForm.value)
      .subscribe(resp =>{
        
        if(this.loginForm.get('remember')?.value){
          localStorage.setItem('email',this.loginForm.get('email')?.value)
        }else{
          localStorage.removeItem('email');
        }

        //Navegar al dashboard
        this.router.navigateByUrl('/');
      },(err) => {
        //si sucede un error
        Swal.fire('Error', err.error.msg,'error');
      });
  }

    //console.log(this.loginForm.value)
    //this.router.navigateByUrl('/');
  }


