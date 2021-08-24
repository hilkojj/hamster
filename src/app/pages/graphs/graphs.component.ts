import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {

  dataPoints: Observable<any[]>

  constructor(firestore: AngularFirestore) {

    this.dataPoints = firestore.collection("temperatureHumidity", ref => ref.where("frequency", "==", "FREQUENT").orderBy("time", "desc").limit(1))
      .valueChanges()

  }

  ngOnInit(): void {
  }

}
