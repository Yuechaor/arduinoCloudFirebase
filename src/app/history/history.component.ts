import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { WeatherService } from '../weather.service';
import * as _ from 'lodash';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  @ViewChild('chart2') elh: ElementRef;
  date = '';
  dataNotFound = false;
  dataFound = false;
  searchResult = [];
  xArray2 = [];
  yArray2 = [];
  y2Array2 = [];
  constructor(private _weather: WeatherService) { }

  ngOnInit() {
  }
  getSearchDate(event: Event) {
    this.date = (<HTMLInputElement>event.target).value;
    // console.log(this.date);
    if (this.date) {
      const subs = this._weather.searchDateByDate(this.date).valueChanges().subscribe(data => {
        // console.log(data);
        this.searchResult = data;
        if (this.searchResult.length === 0) {
          this.dataNotFound = true;
          this.dataFound = false;
          Plotly.purge(this.elh.nativeElement);
        }
        // console.log(this.date);
        // console.log(this.searchResult);
        if (this.searchResult.length !== 0) {
          this.dataNotFound = false;
          this.dataFound = true;
          Plotly.purge(this.elh.nativeElement);
          this.historyLineChart(this.searchResult, this.xArray2, this.yArray2, this.y2Array2 );
          // this.searchResult = [];
          subs.unsubscribe();
        }
      });
    }
  }
  historyLineChart(data2, xArray2, yArray2, y2Array2) {
    const elementh = this.elh.nativeElement;
          this.xArray2 = [];
          this.yArray2 = [];
          this.y2Array2 = [];
    Object.getOwnPropertyNames(data2).forEach(function(val, idx, array) {
      // console.log(val + ' -> ' + data[val].time);
      xArray2.push(data2[val].date + ' ' + data2[val].time );
      // xArray.push(data[val].time);
      yArray2.push(data2[val].temp);
      y2Array2.push(data2[val].huminity);
    });
    const trace3 = {
      x: xArray2,
      y: yArray2,
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
    const trace4 = {
      x: xArray2,
      y: y2Array2,
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

    const chartDate2 = [trace3, trace4];

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
      title: this.date + '<br> Temperature & Humidity',
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
    Plotly.plot(elementh, chartDate2, style);
  }
}
