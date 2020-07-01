import { createReducer, on } from '@ngrx/store';
import {
  dodajNarudzbinu,
  dodajNaRacun,
  izbrisiNarudzbinu,
  naplatiRacun,
  promeniStanje,
  napraviRacun,
  sacuvajMeni,
} from '../actions/sto.actions';
import { INarudzbina } from 'src/app/models/narudzbina';
import { IRacun } from 'src/app/models/racun';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { IProizvod } from 'src/app/models/proizvod';

interface NarudzbinaState extends EntityState<INarudzbina> {
  ids: number[];
  entities: { [id: number]: INarudzbina };
}

interface RacunState extends EntityState<IRacun> {
  ids: number[];
  entities: { [id: number]: IRacun };
}
interface MeniState extends EntityState<IProizvod> {
  ids: number[];
  entities: { [id: number]: IProizvod };
}
export interface State {
  nizNarudzbina: NarudzbinaState;
  nizRacuna: RacunState;
  nizProizvoda: MeniState;
  nizStanja: Array<string>;
  kasa: number;
}

const adapterNarudzbina = createEntityAdapter<INarudzbina>();
const adapterRacun = createEntityAdapter<IRacun>();
const adapterMeni = createEntityAdapter<IProizvod>();

const NarudzbinaInitialState: NarudzbinaState = adapterNarudzbina.getInitialState(
  {
    ids: [],
    entities: [],
  }
);
const RacunInitialState: RacunState = adapterRacun.getInitialState({
  ids: [],
  entities: [],
});
const MeniInitialState: MeniState = adapterMeni.getInitialState({
  ids: [],
  entities: [],
});
const initialState = {
  nizNarudzbina: NarudzbinaInitialState,
  nizRacuna: RacunInitialState,
  nizProizvoda: MeniInitialState,
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
const _stateReducer = createReducer(
  initialState,
  on(sacuvajMeni, (state, action) => ({
    ...state,
    nizProizvoda: adapterMeni.addAll(action.proizvodi, state.nizProizvoda),
  })),
  on(dodajNarudzbinu, (state, action) => ({
    ...state,
    nizNarudzbina: adapterNarudzbina.addOne(
      action.narudzbina,
      state.nizNarudzbina
    ),
  })),
  on(izbrisiNarudzbinu, (state, action) => ({
    ...state,
    nizNarudzbina: adapterNarudzbina.removeOne(
      action.idStola,
      state.nizNarudzbina
    ),
  })),
  on(napraviRacun, (state, action) => ({
    ...state,
    nizRacuna: adapterRacun.addOne(action.racun, state.nizRacuna),
  })),
  on(dodajNaRacun, (state, action) => ({
    ...state,
    nizRacuna: adapterRacun.updateOne(
      {
        id: action.idStola,
        changes: {
          naruceniProizvodi: state.nizRacuna.entities[
            action.idStola
          ].naruceniProizvodi.concat(action.changes.naruceniProizvodi),
          iznos:
            state.nizRacuna.entities[action.idStola].iznos +
            action.changes.iznos,
        },
      },
      state.nizRacuna
    ),
  })),
  on(naplatiRacun, (state, action) => ({
    ...state,
    kasa: state.kasa + state.nizRacuna.entities[action.idStola].iznos,
    nizRacuna: adapterRacun.removeOne(action.idStola, state.nizRacuna),
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
export function stateReducer(state, action) {
  return _stateReducer(state, action);
}
//Selectors
// export const selectNarudzbinaState = (state: State) => state.nizNarudzbina;
// export const selectRacunState = (state: State) => state.nizRacuna;

// export const {
//   selectAll: selectAllNarudzbine,
// } = adapterNarudzbina.getSelectors();
// export const { selectAll: selectAllRacune } = adapterRacun.getSelectors();
