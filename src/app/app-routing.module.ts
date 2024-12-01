import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimesheetComponent } from './views/pages/components/timesheet/timesheet.component';

const routes: Routes =  [
  {
    path: '',
    component: TimesheetComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
