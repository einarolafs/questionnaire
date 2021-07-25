import { createAction, props } from '@ngrx/store';
import { FormsType } from '../reducers/forms.reducer';

export const getFormsAction = createAction('[Forms] Get data');

export const setFormsAction = createAction('[Forms] Set data', props<FormsType>());