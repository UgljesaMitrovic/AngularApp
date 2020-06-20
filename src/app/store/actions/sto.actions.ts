import { createAction, props } from '@ngrx/store';
import { IProizvod } from 'src/app/models/proizvod';

export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');

export const dodajNarudzbinu = createAction(
  '[sto komponenta] dodaj narudzbinu',
  props<{ nizProizvoda: Number[]; idStola: number }>()
);
export const dodajNaRacun = createAction(
  '[sto komponenta] dodaj u racun stola',
  props<{
    racun: IProizvod[];
    idStola: number;
    iznosZadnjeNarudzbine: number;
  }>()
);
