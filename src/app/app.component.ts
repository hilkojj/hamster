import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Observable, Subscription } from 'rxjs';

declare const Twitch: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  temperature: Observable<number>
  humidity: Observable<number>
  viewers: Observable<number>

  subscriptions: Subscription[] = []

  constructor(
    public socket: Socket,

    private router: Router
  ) {
    (window as any).socket = this.socket;

    let path = localStorage.getItem('path')
    if (path) {
      localStorage.removeItem('path')
      this.router.navigate([path])
    }

    this.temperature = this.socket.fromEvent("temperature")
    this.subscriptions.push(this.temperature.subscribe())
    
    this.humidity = this.socket.fromEvent("humidity")
    this.subscriptions.push(this.humidity.subscribe())

    this.viewers = this.socket.fromEvent("viewers")
    this.subscriptions.push(this.viewers.subscribe())

    this.socket.emit("request_sensor_data")
    this.socket.emit("request_viewers")
  }

  ngOnInit(): void {

    if (this.onlySensors())
    {
      document.body.style.background = "transparent"
      document.documentElement.style.background = "transparent"
      return;
    }

    new Twitch.Embed("twitch-embed", {
      width: "100%",
      height: 480,
      channel: "harrie_bombarie",
      muted: true,
      layout: "video"
    });

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  onlySensors(): boolean {
    return location.hash.endsWith("onlysensors")
  }

}
