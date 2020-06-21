import { createSelector, createFeatureSelector, props } from '@ngrx/store';
import { State } from './sto.reducers';

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

export const getStanje = createSelector(
  getState,
  (state: State) => state.nizStanja
);
