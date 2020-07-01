import { IProizvod } from './proizvod';

export interface IRacun {
  id: number;
  naruceniProizvodi: Array<IProizvod>;
  iznos: number;
}
