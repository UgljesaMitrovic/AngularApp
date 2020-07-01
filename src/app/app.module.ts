import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { KaficComponent } from './components/kafic/kafic.component';
import { StoComponent } from './components/sto/sto.component';
import { HttpClientModule } from '@angular/common/http';
import { RacunComponent } from './components/racun/racun.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { StoreModule } from '@ngrx/store';
import { narudzbinaReducer } from './store/reducers/sto.reducers';

@NgModule({
  declarations: [
    AppComponent,
    KaficComponent,
    StoComponent,
    RacunComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ naruci: narudzbinaReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
