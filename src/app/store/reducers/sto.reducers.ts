import { createReducer, on } from '@ngrx/store';
import {
  dodajNarudzbinu,
  dodajNaRacun,
  izbrisiNarudzbinu,
  naplatiRacun,
  promeniStanje,
} from '../actions/sto.actions';
import { INarudzbina } from 'src/app/models/narudzbina';
import { IRacun } from 'src/app/models/racun';

export interface State {
  nizNarudzbina: Array<INarudzbina>;
  nizRacuna: Array<IRacun>;
  nizStanja: Array<string>;
  kasa: number;
}
export const inicijalniState: State = {
  nizNarudzbina: [
    { idStola: 1, nizBrojeva: [] },
    { idStola: 2, nizBrojeva: [] },
    { idStola: 3, nizBrojeva: [] },
    { idStola: 4, nizBrojeva: [] },
    { idStola: 5, nizBrojeva: [] },
    { idStola: 6, nizBrojeva: [] },
    { idStola: 7, nizBrojeva: [] },
    { idStola: 8, nizBrojeva: [] },
    { idStola: 9, nizBrojeva: [] },
    { idStola: 10, nizBrojeva: [] },
  ],
  nizRacuna: [
    { idStola: 1, naruceniProizvodi: [], iznos: 0 },
    { idStola: 2, naruceniProizvodi: [], iznos: 0 },
    { idStola: 3, naruceniProizvodi: [], iznos: 0 },
    { idStola: 4, naruceniProizvodi: [], iznos: 0 },
    { idStola: 5, naruceniProizvodi: [], iznos: 0 },
    { idStola: 6, naruceniProizvodi: [], iznos: 0 },
    { idStola: 7, naruceniProizvodi: [], iznos: 0 },
    { idStola: 8, naruceniProizvodi: [], iznos: 0 },
    { idStola: 9, naruceniProizvodi: [], iznos: 0 },
    { idStola: 10, naruceniProizvodi: [], iznos: 0 },
  ],
  nizStanja: [
    'Slobodan',
    'Slobodan',
    'Slobodan',
    'Slobodan',
    'Slobodan',
    'Slobodan',
    'Slobodan',
    'Slobodan',
    'Slobodan',
    'Slobodan',
  ],
  kasa: 0,
};

const _narudzbinaReducer = createReducer(
  inicijalniState,
  on(dodajNarudzbinu, (state, { nizProizvoda, idStola }) => ({
    ...state,
    nizNarudzbina: [
      ...state.nizNarudzbina.slice(0, idStola - 1),
      {
        idStola: idStola,
        nizBrojeva: nizProizvoda,
      },
      ...state.nizNarudzbina.slice(idStola),
    ],
  })),
  on(izbrisiNarudzbinu, (state, { idStola }) => ({
    ...state,
    nizNarudzbina: [
      ...state.nizNarudzbina.slice(0, idStola - 1),
      {
        idStola: idStola,
        nizBrojeva: [],
      },
      ...state.nizNarudzbina.slice(idStola),
    ],
  })),
  on(dodajNaRacun, (state, { racun, idStola, iznosZadnjeNarudzbine }) => ({
    ...state,
    nizRacuna: [
      ...state.nizRacuna.slice(0, idStola - 1),
      {
        idStola: idStola,
        naruceniProizvodi: [
          ...state.nizRacuna[idStola - 1].naruceniProizvodi.concat(racun),
        ],
        iznos: state.nizRacuna[idStola - 1].iznos + iznosZadnjeNarudzbine,
      },
      ...state.nizRacuna.slice(idStola),
    ],
  })),
  on(naplatiRacun, (state, { idStola }) => ({
    ...state,
    kasa: state.kasa + state.nizRacuna[idStola - 1].iznos,
    nizRacuna: [
      ...state.nizRacuna.slice(0, idStola - 1),
      {
        idStola: idStola,
        naruceniProizvodi: [],
        iznos: 0,
      },
      ...state.nizRacuna.slice(idStola),
    ],
  })),
  on(promeniStanje, (state, { stanjeStola, idStola }) => ({
    ...state,
    nizStanja: [
      ...state.nizStanja.slice(0, idStola - 1),
      stanjeStola,
      ...state.nizStanja.slice(idStola),
    ],
  }))
);
export function narudzbinaReducer(state, action) {
  return _narudzbinaReducer(state, action);
}
