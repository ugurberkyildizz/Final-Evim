import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PozitifcubeHttpService } from '../../../shared/services/pozitifcube-http.service';

import * as Chartist from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';

interface Chart {
	type: ChartType;
	data: Chartist.IChartistData;
	options?: any;
	responsiveOptions?: any;
	events?: ChartEvent;
}

/* import * as chartData from '../../../shared/data/dashboard/default'; */
declare var require: any
var Knob = require('knob')// browserify require

var primary = localStorage.getItem('primary_color') || '#4466f2';
var secondary = localStorage.getItem('secondary_color') || '#1ea6ec';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class EcommerceComponent implements OnInit {

  public loading = null;
  public listsubscribes :any;
  public data : any = [];

  public chartBox1: Chart = {
    type: 'Line',
    data: { labels: [], series: [ [] ] },
    options: {
      lineSmooth: Chartist.Interpolation.simple({ divisor: 2 }),
      fullWidth: !0,  showArea: !0, chartPadding: { right: 0, left: 0, bottom: 0 },
      axisY: { low: 0, showGrid: false, showLabel: false, offset: 0 },
      axisX: { showGrid: false, showLabel: false, offset: 0 }
    },
    events: {
      created: (data) => {
        var defs = data.svg.elem('defs');
        defs.elem('linearGradient', { id: 'gradient2', x1: 1, y1: 1, x2: 0, y2: 0 }).elem('stop', { offset: 0, 'stop-color': primary  }).parent().elem('stop', { offset: 1, 'stop-color': secondary });
      }
    }
  }

  public chartBox2: Chart = {
    type: 'Line',
    data: { labels: [], series: [ [] ] },
    options: {
      lineSmooth: Chartist.Interpolation.simple({ divisor: 2 }),
      fullWidth: !0,  showArea: !0, chartPadding: { right: 0, left: 0, bottom: 0 },
      axisY: { low: 0, showGrid: false, showLabel: false, offset: 0 },
      axisX: { showGrid: false, showLabel: false, offset: 0 }
    },
    events: {
      created: (data) => {
        var defs = data.svg.elem('defs');
        defs.elem('linearGradient', { id: 'gradient3', x1: 1, y1: 1, x2: 0, y2: 0 }).elem('stop', { offset: 0, 'stop-color': primary  }).parent().elem('stop', { offset: 1, 'stop-color': secondary });
      }
    }
  }

  public chartBox3: Chart = {
    type: 'Line',
    data: { labels: [], series: [ [] ] },
    options: {
      lineSmooth: Chartist.Interpolation.simple({ divisor: 2 }),
      fullWidth: !0,  showArea: !0, chartPadding: { right: 0, left: 0, bottom: 0 },
      axisY: { low: 0, showGrid: false, showLabel: false, offset: 0 },
      axisX: { showGrid: false, showLabel: false, offset: 0 }
    },
    events: {
      created: (data) => {
        var defs = data.svg.elem('defs');
        defs.elem('linearGradient', { id: 'gradient4', x1: 1, y1: 1, x2: 0, y2: 0 }).elem('stop', { offset: 0, 'stop-color': primary  }).parent().elem('stop', { offset: 1, 'stop-color': secondary });
      }
    }
  }

  public chartProduction: Chart = {
    type: 'Line',
    data: {
      labels: ['Aralık','Ocak', 'Şubat', 'Mart', 'Nisan','Mayıs'],
      series: [
        [130,100, 110, 140, 130 , 98],
        [123,90, 102, 137 , 130 , 93]
      ]
    },
    options: { fullWidth: true, chartPadding: { right: 40 } },
    events: { created: (data) => { } }
  }

  public chartCalculation: Chart = {
    type: 'Line',
    data: {
      labels: ['01', '02', '03', '04', '05', '06', '07', '08'],
      series: [
        [0, 2, 1.2, 4, 2, 3, 1.5, 0],
        [0, 1, 2.2, 1.5, 3, 1.5, 2.25, 0]
      ]
    },
    options: { low: 0, showArea: true, fullWidth: true, onlyInteger: true, chartPadding: { left: 0, right: 0, },
      axisY: { low: 0, scaleMinSpace: 50, }, axisX: { showGrid: false }
    },
    events: {
      created: (data) => {
        var defs = data.svg.elem('defs');
        defs.elem('linearGradient', { id: 'gradient1', x1: 0, y1: 0, x2: 1, y2: 1 }).elem('stop', { offset: 0, 'stop-color': primary }).parent().elem('stop', {offset: 1, 'stop-color': secondary });
      }
    }
  }


  constructor(  private pocu:PozitifcubeHttpService  ) { 

    
  }
  
  getData(){

    this.loading = true;
    this.listsubscribes = this.pocu.getViewList({}).subscribe(response => {
      this.data = response.data;
      this.loading = false;
      console.log(response);
      
      this.chartBox1.data.labels = response.data.visits7label;
      this.chartBox1.data.series[0] = response.data.visits7data;

      this.chartBox2.data.labels = response.data.orders7label;
      this.chartBox2.data.series[0] = response.data.orders7data;

      this.chartBox3.data.labels = response.data.ortotals7label;
      this.chartBox3.data.series[0] = response.data.ortotals7data;
 
    });

  }


  ngOnInit() {

    //this.getData();
   /*  var profit = Knob({
      value: 35,
      angleOffset: 90,
      className: "review",
      thickness: 0.2,
      width: 270,
      height: 270,
      fgColor: primary,
      bgColor: '#f6f7fb',
      lineCap: 'round'
    })
    document.getElementById('profit').append(profit) */
  }

  // Chart Data  
  public chart1 = this.chartBox1;
  public chart2 = this.chartBox2;
  public chart3 = this.chartBox3;
  public chart4 = this.chartProduction;
  public chart5 = this.chartCalculation;

}
