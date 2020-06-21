import { createAction, props } from '@ngrx/store';
import { IProizvod } from 'src/app/models/proizvod';

export const dodajNarudzbinu = createAction(
  '[sto komponenta] dodaj narudzbinu',
  props<{ nizProizvoda: Number[]; idStola: number }>()
);
export const izbrisiNarudzbinu = createAction(
  '[sto komponenta] izbrisi narudzbinu',
  props<{ idStola: number }>()
);
export const dodajNaRacun = createAction(
  '[sto komponenta] dodaj u racun stola',
  props<{
    racun: IProizvod[];
    idStola: number;
    iznosZadnjeNarudzbine: number;
  }>()
);
export const naplatiRacun = createAction(
  '[sto komponenta] naplati racun stola',
  props<{
    idStola: number;
  }>()
);
export const promeniStanje = createAction(
  '[sto komponenta] promeni stanje stola',
  props<{
    stanjeStola: string;
    idStola: number;
  }>()
);
