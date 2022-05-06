import { Component } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public labels1:string[] = [ 'Papapleto', 'Pizza', 'Sushi' ];
  public data1 = [
     [ 900, 5000, 9000 ], 
  ]
}
