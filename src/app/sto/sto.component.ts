import { Component, OnInit, Input } from '@angular/core';
import { KaficService } from '../kafic.service';
import { IProizvod } from '../proizvod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sto',
  templateUrl: './sto.component.html',
  styleUrls: ['./sto.component.css'],
})
export class StoComponent implements OnInit {
  @Input() public idStola: number;
  public zauzet: string = 'Slobodan';
  public narudzbina: Array<number> = [];
  public racun: Array<IProizvod> = [];
  constructor(private _kaficService: KaficService, private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.zauzet = 'Zauzet';
      this.narudzbina = this._kaficService.napraviNarudzbinu();
    }, Math.random() * 20000);
  }
  donesiNarudzbinu() {
    this._kaficService.donesiNarudzbinu().subscribe((data) => {
      this.narudzbina.forEach((id) => {
        this.racun.push(data.find((proizvod) => proizvod.id == id));
      });
    });
    console.log(this.racun);
  }
  pogledajRacun(idStola: number) {
    this.router.navigate(['/racun', idStola]);
  }
}
