import { Component, OnInit, Input } from '@angular/core';
import { KaficService } from '../../services/kafic.service';
import { IProizvod } from '../../models/proizvod';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  dodajNarudzbinu,
  dodajNaRacun,
  izbrisiNarudzbinu,
  promeniStanje,
} from 'src/app/store/actions/sto.actions';
import { getNarudzbinu, getState, getStanje } from 'src/app/store/reducers';
import { State } from 'src/app/store/reducers/sto.reducers';
import { INarudzbina } from 'src/app/models/narudzbina';

@Component({
  selector: 'app-sto',
  templateUrl: './sto.component.html',
  styleUrls: ['./sto.component.css'],
})
export class StoComponent implements OnInit {
  @Input() public idStola: number;
  public zauzet: string = 'Slobodan';
  public narudzbina: Number[] = [];
  public racun: Array<IProizvod> = [];
  constructor(
    private _kaficService: KaficService,
    private router: Router,
    private store: Store<{ naruci: State }>
  ) {
    // store.subscribe((s) => {
    //   console.log(s);
    // });
  }

  ngOnInit(): void {
    this.store.pipe(select(getNarudzbinu)).subscribe((data) => {
      this.narudzbina = data[this.idStola - 1].nizBrojeva;
    });
    this.store.pipe(select(getStanje)).subscribe((data) => {
      this.zauzet = data[this.idStola - 1];
    });
    if (this.narudzbina.length == 0) {
      // Ako je prvi put loadovana stranica tad ce narudzbina da bude prazna (nije jos nista bilo u storu ) onda simuliraj narudzbinu
      // Ako ima nesto u narudzbinu najpre da se ona odradi, izbaci iz stora pa onda opet moze da se simulira nova narudzbina
      setTimeout(() => {
        this.promeniStanjeStolaUStore('Zauzet');
        this.narudzbina = this._kaficService.napraviNarudzbinu();
        this.dodajNarudzbinuUStore(); //Svaki put da se doda narudzbina u store i da se izbaci kad se obavi
      }, Math.random() * 20000);
    }
  }
  donesiNarudzbinu() {
    this._kaficService.donesiNarudzbinu().subscribe((data) => {
      this.narudzbina.forEach((id) => {
        this.racun.push(data.find((proizvod) => proizvod.id == id));
      });
      this.dodajNaRacunUStore();
      this.obrisiNarudzbinuUStore();
    });
  }
  pogledajRacun(idStola: number) {
    this.router.navigate(['/racun', idStola]); //Prepravi url na trentni kroz racun sa Id stola na koji si kliknuo
  }
  //Akcije
  dodajNarudzbinuUStore() {
    this.store.dispatch(
      dodajNarudzbinu({
        nizProizvoda: this.narudzbina,
        idStola: this.idStola,
      })
    );
  }
  obrisiNarudzbinuUStore() {
    this.store.dispatch(
      izbrisiNarudzbinu({
        idStola: this.idStola,
      })
    );
  }
  dodajNaRacunUStore() {
    this.store.dispatch(
      dodajNaRacun({
        racun: this.racun,
        idStola: this.idStola,
        iznosZadnjeNarudzbine: this._kaficService.izracunajIznosNarudzbine(
          this.racun
        ),
      })
    );
  }
  promeniStanjeStolaUStore(stanje: string) {
    this.store.dispatch(
      promeniStanje({
        stanjeStola: stanje,
        idStola: this.idStola,
      })
    );
  }
}
