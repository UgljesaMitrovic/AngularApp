import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.css'],
})
export class RacunComponent implements OnInit {
  public stoId: number;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    //let id = parseInt(this.route.snapshot.paramMap.get('id'));
    //this.stoId = id;
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.stoId = id;
    });
  }
  nazadNaKafic() {
    let id = this.stoId ? this.stoId : null;
    this.router.navigate(['']);
  }
}
