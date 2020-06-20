import { Component, OnInit, Input } from '@angular/core';
import { KaficService } from '../../services/kafic.service';
import { IProizvod } from '../../models/proizvod';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  dodajNarudzbinu,
  dodajNaRacun,
} from 'src/app/store/actions/sto.actions';
import { getNarudzbinu, getState } from 'src/app/store/reducers';
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
  //obsNarudzbina$: Observable<Array<INarudzbina>>;
  //storeNarudzbina: Array<Number>;
  constructor(
    private _kaficService: KaficService,
    private router: Router,
    private store: Store<{ naruci: State }>
  ) {
    store.pipe(select(getState)).subscribe((data) => {
      console.log(data);
    });
    // store.subscribe((s) => {
    //   console.log(s);
    // });
    // store.pipe(select(getIdNarudzbine)).subscribe((id) => {
    //   if (this.idStola == id);
    //   //Onda treba da podignes to zadnje sa stora sto je ubaceno
    // });
  }

  ngOnInit(): void {
    this.store.pipe(select(getNarudzbinu)).subscribe((data) => {
      this.narudzbina = data[this.idStola - 1].nizBrojeva;
      //this.storeNarudzbina = data[this.idStola - 1].nizBrojeva;
    });
    if (this.narudzbina.length == 0) {
      // Ako je prvi put loadovana stranica tad ce narudzbina da bude prazna (nije jos nista bilo u storu ) onda simuliraj narudzbinu
      // Ako ima nesto u narudzbinu najpre da se ona odradi, izbaci iz stora pa onda opet moze da se simulira nova narudzbina
      setTimeout(() => {
        this.zauzet = 'Zauzet';
        this.narudzbina = this._kaficService.napraviNarudzbinu();
        this.dodajNarudzbinuUStore(); //Svaki put da se doda narudzbina u store i da se izbaci kad se obavi
      }, Math.random() * 20000);
    } else {
      // Ako zatreba
    }
  }
  donesiNarudzbinu() {
    this._kaficService.donesiNarudzbinu().subscribe((data) => {
      this.narudzbina.forEach((id) => {
        this.racun.push(data.find((proizvod) => proizvod.id == id));
      });
      this.dodajNaRacunUStore();
    });
  }
  pogledajRacun(idStola: number) {
    this.router.navigate(['/racun', idStola]); //Prepravi url na trentni kroz racun sa Id stola na koji si kliknuo
  }
  //Store deo
  dodajNarudzbinuUStore() {
    this.store.dispatch(
      dodajNarudzbinu({
        nizProizvoda: this.narudzbina,
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
}
