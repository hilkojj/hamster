import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphsComponent } from './pages/graphs/graphs.component';
import { environment } from 'src/environments/environment';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

/**
 * How to use ngx-socket-io: https://www.npmjs.com/package/ngx-socket-io
 */
const socketIoConfig: SocketIoConfig = { url: environment.socketIoUrl, options: { } };

@NgModule({
  declarations: [
    AppComponent,
    GraphsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(socketIoConfig)
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/hamster/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
