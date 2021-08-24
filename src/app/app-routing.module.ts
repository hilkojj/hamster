import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphsComponent } from './pages/graphs/graphs.component';

const routes: Routes = [
  { path: '', redirectTo: '/graphs', pathMatch: 'full' },
  { path: 'graphs', component: GraphsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
