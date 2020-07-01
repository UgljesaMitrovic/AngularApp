import { createAction, props } from '@ngrx/store';
import { IProizvod } from 'src/app/models/proizvod';
import { INarudzbina } from 'src/app/models/narudzbina';
import { IRacun } from 'src/app/models/racun';

export const dodajNarudzbinu = createAction(
  '[sto komponenta] dodaj narudzbinu',
  props<{
    narudzbina: INarudzbina;
  }>()
);
export const izbrisiNarudzbinu = createAction(
  '[sto komponenta] izbrisi narudzbinu',
  props<{ idStola: number }>()
);
export const napraviRacun = createAction(
  '[sto komponenta] napravi racun',
  props<{
    racun: IRacun;
  }>()
);
export const dodajNaRacun = createAction(
  '[sto komponenta] dodaj u racun stola',
  props<{
    idStola: number;
    changes: IRacun;
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
export const fetchMeni = createAction(
  '[sto komponenta] digni sve proizvode iz meni-a'
);
export const sacuvajMeni = createAction(
  '[sto komponenta] sacuvaj meni u store',
  props<{ proizvodi: IProizvod[] }>()
);
