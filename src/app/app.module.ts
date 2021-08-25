import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphsComponent } from './pages/graphs/graphs.component';
import { environment } from 'src/environments/environment';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxEchartsModule } from 'ngx-echarts';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { APIInterceptor } from './api-interceptor';

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
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    BrowserAnimationsModule,
    SocketIoModule.forRoot(socketIoConfig),
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/hamster/'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
