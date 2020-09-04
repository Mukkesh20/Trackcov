import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { ChartsComponent } from './chartjs/charts.component';

const routes: Routes = [
  { path: 'chartjs', component: ChartsComponent },
]

@NgModule({
  declarations: [ChartsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ChartsModule
  ]
})
export class ChartsDemoModule { }
