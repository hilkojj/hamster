import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';

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

  constructor() {

    // firestore.collection("temperatureHumidity",
    //   ref => ref.where("frequency", "==", "HOUR").orderBy("time", "desc").limit(60*24)
    // ).get().subscribe(result => {
    //   result.docs.forEach(d => {
    //     let datapoint: any = d.data()

    //     console.log(datapoint.time)

    //     this.tempPoints[0].series.push({
    //       name: datapoint.time.toDate(),
    //       value: datapoint.temperature
    //     })
    //     this.tempRange[0] = Math.min(this.tempRange[0], datapoint.temperature - 3)
    //     this.tempRange[1] = Math.max(this.tempRange[1], datapoint.temperature + 3)

    //     this.humidPoints[0].series.push({
    //       name: datapoint.time.toDate(),
    //       value: datapoint.humidity
    //     })
    //     this.humidRange[0] = Math.min(this.humidRange[0], datapoint.humidity - 10)
    //     this.humidRange[1] = Math.max(this.humidRange[1], datapoint.humidity + 10)
    //   })
    // })

  }

  ngOnInit(): void {
  }


}
