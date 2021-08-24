import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  tempHumid: Observable<any[]>

  constructor(
    firestore: AngularFirestore,
    private router: Router
  ) {

    this.tempHumid = firestore.collection("temperatureHumidity", 
      ref => ref.orderBy("time", "desc").limit(1)
    ).valueChanges()

    let path = localStorage.getItem('path')
    if (path) {
      localStorage.removeItem('path')
      this.router.navigate([path])
    }
  }

}
