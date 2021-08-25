import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {

  tempPoints: any[] = [
    {
      "name": "Temp.",
      "series": []
    },
  ]
  tempRange = [100, 0]

  humidPoints: any[] = [
    {
      "name": "Humid.",
      "series": []
    },
  ]
  humidRange = [100, 0]

  below = LegendPosition.Below

  constructor(
    private http: HttpClient
  ) {

  }

  async ngOnInit() {

    let data: any = await this.http.get("sensor_data.json?frequency=minute").toPromise()
    data.datapoints.forEach((row: any) => {

      let date = new Date(row[0] * 1000)
      let temp = row[1]
      let humid = row[2]

      this.tempPoints[0].series.push({
        name: date,
        value: temp
      })
      this.tempRange[0] = Math.min(this.tempRange[0], temp - 2)
      this.tempRange[1] = Math.max(this.tempRange[1], temp + 2)

      this.humidPoints[0].series.push({
        name: date,
        value: humid
      })
      this.humidRange[0] = Math.min(this.humidRange[0], humid - 10)
      this.humidRange[1] = Math.max(this.humidRange[1], humid + 10)
    })

  }

}
