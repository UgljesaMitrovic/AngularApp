import { createSelector, createFeatureSelector, props } from '@ngrx/store';
import { getNizNarudzbina, State } from './sto.reducers';
import { INarudzbina } from 'src/app/models/narudzbina';

export const getState = createFeatureSelector('naruci');

// iz getState dobijas osnovni state ovo u zagradi i u okviru tog nivoa pristupas nizu narudzbina
export const getNarudzbinu = createSelector(
  getState,
  (state: State) => state.nizNarudzbina
);

export const getRacun = createSelector(
  getState,
  (state: State) => state.nizRacuna
);

export const getKasu = createSelector(getState, (state: State) => state.kasa);

/* export const getNarudzbinuNizBrojeva = createSelector(
  getNarudzbinu,
  (niz: Array<INarudzbina>) => niz[0].nizBrojeva
);
export const getNarudzbinuIdStola = createSelector(
  getNarudzbinu,
  (niz: Array<INarudzbina>) => niz[0].idStola
);
 */
