import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/store/reducers/sto.reducers';
import { getKasu } from 'src/app/store/reducers';

@Component({
  selector: 'app-kafic',
  templateUrl: './kafic.component.html',
  styleUrls: ['./kafic.component.css'],
})
export class KaficComponent implements OnInit {
  public naziv: string = 'ElectroniCaffe';
  public kasa: number;
  public stolovi: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private store: Store<{ naruci: State }>) {}

  ngOnInit(): void {
    this.store.pipe(select(getKasu)).subscribe((data) => {
      this.kasa = data;
    });
  }
}
