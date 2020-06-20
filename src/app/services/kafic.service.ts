import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProizvod } from '../models/proizvod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KaficService {
  private _url: string = '/assets/meni/skladiste.json';

  constructor(private http: HttpClient) {}

  napraviNarudzbinu() {
    let narudzbina: Array<number> = [];
    let brOsoba: number = Math.floor(Math.random() * 4) + 1;
    for (let i = 0; i < brOsoba; i++) {
      narudzbina.push(Math.floor(Math.random() * 10));
    }
    return narudzbina;
  }
  donesiNarudzbinu(): Observable<IProizvod[]> {
    return this.http.get<IProizvod[]>(this._url);
  }
  izracunajIznosNarudzbine(nizProizvoda: IProizvod[]) {
    let niz: Array<number> = [];
    nizProizvoda.forEach((el) => {
      niz.push(el.cena);
    });
    return niz.reduce(this.reducer);
  }
  reducer = (accumulator: number, currentValue: number) =>
    accumulator + currentValue;
}
