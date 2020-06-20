import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement, reset } from '../../store/actions/sto.actions';

@Component({
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html',
  styleUrls: ['./my-counter.component.css'],
})
export class MyCounterComponent {
  count$: Observable<number>;
  //SVE PREKO STORE-a RADIS HOCES VREDNOST IZ NJEGA KORISTIS SELECT HOCES DA MENJAS STORE KORISTIS DISPATCH
  //sto ima u sebi taj cout koji pamti
  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.pipe(select('count')); // cout OBS dodeljujes count iz store-a da ga nadgleda za njegove promene
  }

  increment() {
    this.store.dispatch(increment()); //Komponenta zahteva akciju increment gde se pravi novi state reducer se okida i count ga pamti gore
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
}
