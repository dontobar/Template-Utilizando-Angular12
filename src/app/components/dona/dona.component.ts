import { Component, Input } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';


@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

  @Input() title:string = 'sin titulo';

  // Doughnut
 @Input('labels') doughnutChartLabels: string[] = [ 'Label1', 'Label2', 'Label3' ];
 @Input('data') doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 350, 450, 100 ],        
      backgroundColor: ["red", "green", "blue"],
      hoverBackgroundColor: ["darkred", "darkgreen", "darkblue"],
      hoverBorderColor: ["grey"] }

    ]

  };
  public doughnutChartType: ChartType = 'doughnut';


}
