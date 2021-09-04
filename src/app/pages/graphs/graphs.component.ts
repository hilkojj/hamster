import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {

  tempOptions: any;
  tempUpdateOptions: any;
  tempData: any = []

  humidOptions: any;
  humidUpdateOptions: any;
  humidData: any = []

  timeTravel = 0

  constructor(
    private http: HttpClient
  ) {
    
  }

  ngOnInit() {

    // initialize chart options:
    this.tempOptions = {
      // title: {
      //   text: 'Dynamic Data + Time Axis'
      // },
      backgroundColor: "transparent",
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => params[0].value[0].toLocaleString() + ` 🌡️<b> ${params[0].value[1].toFixed(1)}°C</b>`
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false
        },
        min: function (value: any) {
          return (value.min - 2) | 0;
        },
        max: function (value: any) {
          return (value.max + 2) | 0;
        }
      },
      series: [{
        name: 'Temperature',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: this.tempData,
        lineStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: '#d44c4c' // color at 0% position
            }, {
                offset: 1, color: '#655c8a' // color at 100% position
            }],
            global: false // false by default
        }
        }
      }]
    };


    // HUMID:
    this.humidOptions = {
      // title: {
      //   text: 'Dynamic Data + Time Axis'
      // },
      backgroundColor: "transparent",
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => params[0].value[0].toLocaleString() + ` 💦<b> ${params[0].value[1].toFixed(1)}%</b>`
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false
        },
        min: function (value: any) {
          return (value.min - 5) | 0;
        },
        max: function (value: any) {
          return (value.max + 5) | 0;
        }
      },
      series: [{
        name: 'Humidity',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: this.humidData,
        lineStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: '#5628e0' // color at 0% position
            }, {
                offset: 1, color: '#329dc7' // color at 100% position
            }],
            global: false // false by default
        }
        }
      }]
    };

    this.scale = 60 * 24

  }

  sinceDate = new Date()
  toDate = new Date()
  frequency = ""

  private _scale = 0

  set scale(scale: number) {
    this._scale = scale
    this.timeTravel = Math.max(0, this.timeTravel)

    let period = scale * 60 * 1000

    this.sinceDate = new Date(Date.now() - period * (this.timeTravel + 1))
    this.toDate = new Date(Date.now() - period * this.timeTravel)

    this.fetch()
  }

  get scale(): number {
    return this._scale
  }

  async fetch() {

    let data: any = await this.http.get(`sensor_data.json?frequency=${this.frequency}&since_date=${this.sinceDate.getTime() / 1000 | 0}&to_date=${this.toDate.getTime() / 1000 | 0}`).toPromise()

    this.tempData = []
    this.humidData = []

    data.datapoints.forEach((row: any) => {

      let date = new Date(row[0] * 1000)
      let temp = row[1]
      let humid = row[2]

      this.tempData.push({
        name: "haha",
        value: [date, temp]
      })
      this.humidData.push({
        name: "haha",
        value: [date, humid]
      })
    })

    this.tempUpdateOptions = {
      series: [{
        data: this.tempData
      }]
    };
    this.humidUpdateOptions = {
      series: [{
        data: this.humidData
      }]
    };

  }

}
