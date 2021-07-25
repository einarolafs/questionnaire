import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { getFormsAction, setFormsAction } from '../actions/forms.actions';
import { FormsService } from '../service/forms.service';
 
@Injectable()
export class FormsEffects {
  constructor(
    private actions$: Actions,
    private formsService: FormsService
  ) {}
 
  fetchForms$ = createEffect(() => this.actions$.pipe(
    ofType(getFormsAction().type),
    mergeMap(() => this.formsService.getForm()
      .pipe(
        map(form => (setFormsAction(form))),
        catchError(() => EMPTY)
      ))
    )
  );
}