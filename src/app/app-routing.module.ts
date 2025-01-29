import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/pages/components/home/home.component';
import { FaradanaCateringComponent } from './views/pages/components/services/faradana-catering/faradana-catering.component';

const routes: Routes =  [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'faradana-catering',
    component: FaradanaCateringComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
