import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { GraphsComponent } from './pages/graphs/graphs.component';
import { LiveComponent } from './pages/live/live.component';

const routes: Routes = [
  { path: '', redirectTo: '/graphs', pathMatch: 'full' },
  { path: 'live', component: LiveComponent },
  { path: 'graphs', component: GraphsComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
