import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportFormComponent } from './report-form/report-form.component';

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: 'report' },
  { path: 'report', component: ReportFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
