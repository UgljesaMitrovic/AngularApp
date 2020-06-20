import { createReducer, on } from '@ngrx/store';
import { dodajNarudzbinu, dodajNaRacun } from '../actions/sto.actions';
import { INarudzbina } from 'src/app/models/narudzbina';
import { IRacun } from 'src/app/models/racun';

export interface State {
  nizNarudzbina: Array<INarudzbina>;
  nizRacuna: Array<IRacun>;
}
export const inicijalniState: State = {
  nizNarudzbina: [
    { idStola: 1, nizBrojeva: [] },
    { idStola: 2, nizBrojeva: [] },
    { idStola: 3, nizBrojeva: [] },
    { idStola: 4, nizBrojeva: [] },
    { idStola: 5, nizBrojeva: [] },
  ],
  nizRacuna: [
    { idStola: 1, naruceniProizvodi: [], iznos: 0 },
    { idStola: 2, naruceniProizvodi: [], iznos: 0 },
    { idStola: 3, naruceniProizvodi: [], iznos: 0 },
    { idStola: 4, naruceniProizvodi: [], iznos: 0 },
    { idStola: 5, naruceniProizvodi: [], iznos: 0 },
  ],
};

const _narudzbinaReducer = createReducer(
  inicijalniState,
  on(dodajNarudzbinu, (state, { nizProizvoda, idStola }) => ({
    ...state,
    nizNarudzbina: [
      ...state.nizNarudzbina.slice(0, idStola - 1),
      {
        ...state.nizNarudzbina[idStola],
        nizBrojeva: nizProizvoda,
        idStola: idStola,
      },
      ...state.nizNarudzbina.slice(idStola),
    ],
  })),
  on(dodajNaRacun, (state, { racun, idStola, iznosZadnjeNarudzbine }) => ({
    ...state,
    nizRacuna: [
      ...state.nizRacuna.slice(0, idStola - 1),
      {
        ...state.nizRacuna[idStola],
        naruceniProizvodi: racun,
        idStola: idStola,
        iznos: state.nizRacuna[idStola].iznos + iznosZadnjeNarudzbine,
      },
      ...state.nizRacuna.slice(idStola),
    ],
  }))
);
export function narudzbinaReducer(state, action) {
  return _narudzbinaReducer(state, action);
}

// export const initialState = 0;
// //UZIMA INITIAL STATE PRVI PUT I PRAVI NOVI STATE SA PROMENJENOM VREDNOSCU SLEDECI PUT KAD BUDE POZVAN KORISTI TAJ NOVI STATE
// const _counterReducer = createReducer(
//   initialState,
//   on(increment, (state) => state + 1),
//   on(decrement, (state) => state - 1),
//   on(reset, (state) => 0)
// );

// export function counterReducer(state, action) {
//   return _counterReducer(state, action);
// }
///////////////////////////////////////////
// export interface State {
//   id: number;
//   nizNarudzbina: Number[][];
// }

// export const inicijalniStateNarudzbina: State = {
//   id: 0,
//   nizNarudzbina: [],
// };

export const getNizNarudzbina = (state: State) => state.nizNarudzbina;

// const _narudzbinaReducer = createReducer(
//   inicijalniStateNarudzbina,
//   on(dodajNarudzbinu, (state, { nizProizvoda, idStola }) => ({
//     ...state,
//     nizNarudzbina: [
//       {
//         ...state.nizNarudzbina[idStola],
//         nizProizvoda,
//       },
//       //...state.nizNarudzbina.slice(1),
//     ],
//     id: idStola,
//   }))
// );
// export function narudzbinaReducer(state, action) {
//   return _narudzbinaReducer(state, action);
// }

////////////////////////////////////////////
// export interface State {
//   home: number;
//   away: number;
// }
// export const initialState: State = {
//   home: 0,
//   away: 0,
// };
// const scoreboardReducer = createReducer(
//   initialState,
//   on(ScoreboardPageActions.homeScore, state => ({ ...state, home: state.home + 1 })),
//   on(ScoreboardPageActions.awayScore, state => ({ ...state, away: state.away + 1 })),
//   on(ScoreboardPageActions.resetScore, state => ({ home: 0, away: 0 })),
//   on(ScoreboardPageActions.setScores, (state, { game }) => ({ home: game.home, away: game.away }))
// );
