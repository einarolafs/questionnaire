import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { formsReducer } from './forms.reducer';

export interface State {
  forms: Record<any, any>
}

export const reducers: ActionReducerMap<State> = {
  forms: formsReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
