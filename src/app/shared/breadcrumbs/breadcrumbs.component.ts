import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter,map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {
  public titulo!:string;
  public tituloSubs$!:Subscription;

  constructor( private router:Router) {
      this.tituloSubs$ = this.getArgumentoRuta()      
                          .subscribe( data =>{
                              this.titulo = data
                              document.title = `AdminPro - ${data}`;

                          });
   }

   ngOnDestroy(): void {
     this.tituloSubs$.unsubscribe();
   }
   
   getArgumentoRuta(){
    return this.router.events
    .pipe(
      filter(event => event instanceof ActivationEnd && event.snapshot.firstChild === null),
      map(event => event instanceof ActivationEnd && event.snapshot.data.titulo),
      );

   }
  }





