import { Component, OnInit, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { WeatherService } from '../weather.service';
import * as _ from 'lodash';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {
  @ViewChild('chart') el: ElementRef;

  constructor(private _weatherService: WeatherService) {
  }
  parameters = [];
  xArray = [];
  yArray = [];
  y2Array = [];


  // ngOnChanges() {
  //   console.log(this.date);
  // }

  ngOnInit() {
    this._weatherService.getDataFromFirebase('/data').valueChanges().subscribe(data => {
      this.parameters = data;
      // this.parameters = data.slice(data.length - 1, data.length);
    // this._weatherService.searchDateByDate().valueChanges().subscribe(date => {

    // });
    // console.log(this.parameters);
    // console.log(this.date);
    Plotly.purge(this.el.nativeElement);
    this.lineChart(this.parameters, this.xArray, this.yArray, this.y2Array );
    });
  }
  lineChart(data, xArray, yArray, y2Array) {
    const element = this.el.nativeElement;
          this.xArray = [];
          this.yArray = [];
          this.y2Array = [];
    Object.getOwnPropertyNames(data).forEach(function(val, idx, array) {
      // console.log(val + ' -> ' + data[val].time);
      xArray.push(data[val].date + ' ' + data[val].time );
      // xArray.push(data[val].time);
      yArray.push(data[val].temp);
      y2Array.push(data[val].huminity);
    });

    // console.log(yArray);
    // console.log(xArray);
    // console.log(y2Array);


    // this.xArray.push(data['0'].second);
    // this.yArray.push(data['0'].temp);
    // const element = this.el.nativeElement;
    // const latestDate = data[];
    // console.log(this.xArray, this.yArray);

    const trace1 = {
      x: xArray,
      y: yArray,
      mode: 'lines+markers',
      line: {
        color: 'rgb(249, 203, 156)',
        width: 2
      },
      marker: {
        line: {width: 3},
        opacity: 1,
        size: 2
      },
      name: 'Temperature (C)',
      type: 'scatter',
      xaxis: 'x2',
      yaxis: 'y2'
    };
    const trace2 = {
      x: xArray,
      y: y2Array,
      mode: 'lines+markers',
      connectgaps: false,
      line: {
        color: 'rgb(109, 158, 235)',
        width: 2
      },
      marker: {
        line: {width: 3},
        opacity: 1,
        size: 2
      },
      name: 'Humidity (%)',
      type: 'scatter'
    };

    const chartDate = [trace1, trace2];

    const style = {
      autosize: false,
      bargap: 0.2,
      bargroupgap: 0,
      barmode: 'stack',
      boxgap: 0.3,
      boxgroupgap: 0.3,
      boxmode: 'overlay',
      dragmode: 'zoom',
      font: {
        color: '#000',
        family: 'Open sans',
        size: 12
      },
      height: 600,
      hovermode: 'x',
      legend: {
        x: 1.00319148936,
        y: 1.1725,
        bgcolor: '#fff',
        bordercolor: '#000',
        borderwidth: 1,
        font: {
          color: '',
          family: '',
          size: 0
        },
        traceorder: 'normal'
      },
      margin: {
        r: 80,
        t: 120,
        b: 80,
        l: 80,
        pad: 2
      },
      paper_bgcolor: '#fff',
      plot_bgcolor: '#fff',
      separators: '.,',
      showlegend: true,
      title: '<b>ARDUINO YÚN</b><br>Temperature and Humidity',
      titlefont: {
        color: '#00979D',
        family: 'Arial Black',
        size: 0
      },
      width: 1100,
      xaxis: {
        anchor: 'y',
        autorange: true,
        autotick: true,
        domain: [0, 1],
        dtick: 7200000,
        exponentformat: 'e',
        gridcolor: '#ddd',
        gridwidth: 1,
        linecolor: '#000',
        linewidth: 1,
        mirror: 'all',
        nticks: 0,
        overlaying: false,
        position: 0,
        range: [1.38931235082e+12, 1.38937252871e+12],
        rangemode: 'normal',
        showexponent: 'all',
        showgrid: true,
        showline: true,
        showticklabels: true,
        tick0: 946702800000,
        tickangle: 'auto',
        tickcolor: '#000',
        tickfont: {
          color: '',
          family: '',
          size: 0
        },
        ticklen: 5,
        ticks: 'outside',
        tickwidth: 1,
        title: '',
        titlefont: {
          color: '',
          family: '',
          size: 0
        },
        type: 'date',
        zeroline: true,
        zerolinecolor: '#000',
        zerolinewidth: 1
      },
      xaxis2: {
        anchor: 'y2',
        autorange: true,
        autotick: true,
        domain: [0, 1],
        dtick: 7200000,
        exponentformat: 'e',
        gridcolor: '#ddd',
        gridwidth: 1,
        linecolor: '#000',
        linewidth: 1,
        mirror: 'all',
        nticks: 0,
        overlaying: false,
        position: 0,
        range: [1.38931235065e+12, 1.38937252853e+12],
        rangemode: 'normal',
        showexponent: 'all',
        showgrid: true,
        showline: true,
        showticklabels: false,
        tick0: 946702800000,
        tickangle: 'auto',
        tickcolor: '#000',
        tickfont: {
          color: '',
          family: '',
          size: 0
        },
        ticklen: 5,
        ticks: '',
        tickwidth: 1,
        title: '',
        titlefont: {
          color: '',
          family: '',
          size: 0
        },
        type: 'date',
        zeroline: true,
        zerolinecolor: '#000',
        zerolinewidth: 1
      },
      yaxis: {
        anchor: 'x',
        autorange: true,
        autotick: true,
        domain: [0, 0.45],
        dtick: 2,
        exponentformat: 'e',
        gridcolor: '#ddd',
        gridwidth: 1,
        linecolor: '#000',
        linewidth: 1,
        mirror: 'all',
        nticks: 0,
        overlaying: false,
        position: 0,
        range: [13.1555555556, 22.0444444444],
        rangemode: 'normal',
        showexponent: 'all',
        showgrid: true,
        showline: true,
        showticklabels: true,
        tick0: 0,
        tickangle: 'auto',
        tickcolor: '#000',
        tickfont: {
          color: '',
          family: '',
          size: 0
        },
        ticklen: 5,
        ticks: 'outside',
        tickwidth: 1,
        title: 'Humidity (%)',
        titlefont: {
          color: '',
          family: '',
          size: 0
        },
        type: 'linear',
        zeroline: true,
        zerolinecolor: '#000',
        zerolinewidth: 1
      },
      yaxis2: {
        anchor: 'x2',
        autorange: true,
        autotick: true,
        domain: [0.55, 1],
        dtick: 1,
        exponentformat: 'e',
        gridcolor: '#ddd',
        gridwidth: 1,
        linecolor: '#000',
        linewidth: 1,
        mirror: 'all',
        nticks: 0,
        overlaying: false,
        position: 0,
        range: [16.8444444444, 21.9555555556],
        rangemode: 'normal',
        showexponent: 'all',
        showgrid: true,
        showline: true,
        showticklabels: true,
        tick0: 0,
        tickangle: 'auto',
        tickcolor: '#000',
        tickfont: {
          color: '',
          family: '',
          size: 0
        },
        ticklen: 5,
        ticks: 'outside',
        tickwidth: 1,
        title: 'Temperature (C)',
        titlefont: {
          color: '',
          family: '',
          size: 0
        },
        type: 'linear',
        zeroline: true,
        zerolinecolor: '#000',
        zerolinewidth: 1
      }
    };
    Plotly.plot(element, chartDate, style);
  }
}
