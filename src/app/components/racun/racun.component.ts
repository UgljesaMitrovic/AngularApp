import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/store/reducers/sto.reducers';
import { getRacun } from 'src/app/store/reducers';
import { IProizvod } from 'src/app/models/proizvod';
import {
  naplatiRacun,
  promeniStanje,
  izbrisiNarudzbinu,
} from 'src/app/store/actions/sto.actions';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.css'],
})
export class RacunComponent implements OnInit {
  public racun: IProizvod[];
  public ukupanIznos: number = 0;
  public stoId: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{ naruci: State }>
  ) {}

  ngOnInit(): void {
    //let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.route.paramMap.subscribe((params: ParamMap) => {
      // Za trenutni url da napravi komponentu (na osnovu id-a)
      let id = parseInt(params.get('id'));
      this.stoId = id;
    });
    this.store.pipe(select(getRacun)).subscribe((data) => {
      this.racun = data[this.stoId - 1].naruceniProizvodi;
      this.ukupanIznos = data[this.stoId - 1].iznos;
    });
  }
  nazadNaKafic() {
    this.router.navigate(['']);
  }
  naplatiRacunUStore() {
    this.store.dispatch(
      naplatiRacun({
        idStola: this.stoId,
      })
    );
    this.store.dispatch(
      izbrisiNarudzbinu({
        idStola: this.stoId,
      })
    );
    this.store.dispatch(
      promeniStanje({
        stanjeStola: 'Slobodan',
        idStola: this.stoId,
      })
    );
  }
}
