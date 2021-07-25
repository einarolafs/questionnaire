import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { setFormsAction } from '../actions/forms.actions';

export type FormsType = Record<any, any>

const adapter: EntityAdapter<FormsType> = createEntityAdapter<FormsType>();
 
export const initialState = adapter.getInitialState();
 
const _formsReducer = createReducer(
  initialState,
  on(setFormsAction, (state, { data }) => {
    return data || state
  }),
);
 
export const formsReducer = (state: any, action: any) => {
  return _formsReducer (state, action);
}