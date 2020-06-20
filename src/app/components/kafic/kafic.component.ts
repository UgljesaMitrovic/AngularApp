import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kafic',
  templateUrl: './kafic.component.html',
  styleUrls: ['./kafic.component.css'],
})
export class KaficComponent implements OnInit {
  public naziv: string = 'ElectroniCaffe';
  public stolovi: Array<number> = [1, 2, 3, 4, 5];

  constructor() {}

  ngOnInit(): void {}
}
