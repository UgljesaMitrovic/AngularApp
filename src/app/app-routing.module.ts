import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RacunComponent } from './components/racun/racun.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { KaficComponent } from './components/kafic/kafic.component';

const routes: Routes = [
  {
    path: '',
    component: KaficComponent,
  },
  {
    path: 'kafic',
    component: KaficComponent,
  },
  {
    path: 'racun/:id',
    component: RacunComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
