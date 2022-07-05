import { Component ,OnInit,NgZone,AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import { UsuarioService } from '../../services/usuario.service';

declare const google:any;
declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,AfterViewInit {

  @ViewChild('googleBtn') googleBtn!:ElementRef;

  public formSubmitted = false;
  public auth2!: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '',[Validators.required,Validators.minLength(6),Validators.email]],
    password: ['',[Validators.required,Validators.minLength(6)]],
    remember:[false]
  });

  constructor(private router:Router,
              private fb:FormBuilder,
              private usuarioService:UsuarioService,
              private ngZone: NgZone) {

               }

    ngOnInit(): void {
      
    //  this.renderButton();
  
      
    }


    ngAfterViewInit(): void {

    this.googleInit();
      
    }

    googleInit(){
      google.accounts.id.initialize({
        client_id: "336467152360-o1sno0tq30qfpjimdc4ck2hnriljrqjr.apps.googleusercontent.com",
        callback: (response:any) => this.handleCredentialResponse(response)
      });
      google.accounts.id.renderButton(
        //document.getElementById("buttonDiv"),
        this.googleBtn.nativeElement,
        { theme: "outline", size: "large" }  // customization attributes
      );
    }

    handleCredentialResponse(response:any){
      //console.log("Encoded JWT ID token: " + response.credential);
      this.usuarioService.loginGoogle(response.credential)
        .subscribe(resp =>{
          this.router.navigateByUrl('/');
        })
    }

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
        //this.router.navigateByUrl('dashboard/perfil');

      },(err) => {
        //si sucede un error
        Swal.fire('Error', err.error.msg,'error');
      });
  }

  renderButton() {
    gapi.signin2.render('asdf', {
      'scope': 'email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': 'onSignInSuccess',
      'onfailure': console.error
    });

    this.startApp();

  }

  async startApp() {
    
    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;
    this.attachSignin( document.getElementById('buttonDiv') );


}

  attachSignin(element:any) {
    this.auth2.attachClickHandler( element, {},
        (googleUser:any) => {
            const id_token = googleUser.getAuthResponse().id_token;
            this.usuarioService.loginGoogle( id_token )
              .subscribe( resp => {
                // Navegar al Dashboard
                this.ngZone.run( () => {
                  this.router.navigateByUrl('/');
                })
              });
        }, (error:any) => {
            alert(JSON.stringify(error, undefined, 2));
        });
  }
}


