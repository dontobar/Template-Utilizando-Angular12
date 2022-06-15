import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';





const routes: Routes = [
    { 
        path:'dashboard',
        component:PagesComponent,
        canActivate:[AuthGuard],
        children:[
          { path:'',component:DashboardComponent,data:{titulo:'Dashboard'}},
          { path:'perfil',component:PerfilComponent,data:{titulo:'Perfil'}},
          { path:'progress',component:ProgressComponent,data:{titulo:'Progress'}},
          { path:'grafica1',component:Grafica1Component,data:{titulo:'Grafica #1'}},
          { path:'account-setting',component:AccountSettingsComponent,data:{titulo:'Ajustes de Cuentas'}},
          { path:'promesas',component:PromesasComponent,data:{titulo:'Promesas'}},
          { path:'rxjs',component:RxjsComponent,data:{titulo:'Rxjs'}},
          
          //Mantenimientos
          { path:'usuarios',component:UsuariosComponent,data:{titulo:'Usuarios de aplicacion'}},
          { path:'medicos',component:MedicosComponent,data:{titulo:'Medicos de aplicacion'}},
          { path:'hospitales',component:HospitalesComponent,data:{titulo:'Hospitales de la aplicacion'}},

        ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
