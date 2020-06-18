import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KaficComponent } from './kafic/kafic.component';
import { StoComponent } from './sto/sto.component';
import { HttpClientModule } from '@angular/common/http';
import { RacunComponent } from './racun/racun.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [AppComponent, KaficComponent, StoComponent, RacunComponent, PageNotFoundComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
