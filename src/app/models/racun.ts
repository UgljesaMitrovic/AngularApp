import { IProizvod } from './proizvod';

export interface IRacun {
  idStola: number;
  naruceniProizvodi: Array<IProizvod>;
  iznos: number;
}
