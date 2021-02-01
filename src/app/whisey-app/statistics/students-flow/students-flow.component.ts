import { ChartData } from './../../model/chart-data.model';
import { ActivitiesDto } from './../../model/activitiesDto.model';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-students-flow',
  templateUrl: './students-flow.component.html',
  styleUrls: ['./students-flow.component.css']
})
export class StudentsFlowComponent implements OnInit {

  numberOfStudents: number[];
  dates: string[];
  chartOptions: {};
  Highcharts = Highcharts;

  constructor(private appointmentService: AppointmentService){}

  ngOnInit() {

    this.appointmentService.findAllChartData().subscribe(data => {
      this.numberOfStudents = data.numberOfStudents;
      this.dates = data.dates;

      this.showFlowChart();
    })
  }

  showFlowChart() {
    this.chartOptions = {
    
      chart: {
        type: "spline"
     },

      title: {
          text: 'Broj ulazaka učenika po datumu'
      },

      xAxis: {
          categories: this.dates
      },
  
      yAxis: {
        title: {
          text: 'Učenici'
      }
      },

     series: [
       {
         name: 'Učenici',
         data: this.numberOfStudents
       }
     ]
    }
  }
}
