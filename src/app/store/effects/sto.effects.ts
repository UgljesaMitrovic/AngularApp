import { KaficService } from 'src/app/services/kafic.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { IProizvod } from 'src/app/models/proizvod';

@Injectable()
export class StoEffects {
  loadProizvodi$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType('[sto komponenta] digni sve proizvode iz meni-a'),
      mergeMap(() =>
        this._kaficService.donesiNarudzbinu().pipe(
          map((proizvodi: IProizvod[]) => ({
            type: '[sto komponenta] sacuvaj meni u store',
            proizvodi: proizvodi,
          }))
        )
      )
    )
  );

  constructor(private actions$: Actions, private _kaficService: KaficService) {}
}
