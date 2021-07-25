import { createReducer, on } from '@ngrx/store';
import { getForms } from '../actions/forms.actions';

 
export const initialState = {};
 
const _formsReducer = createReducer(
  initialState,
  on(getForms, (state) => state),
);
 
export const formsReducer = (state: any, action: any) => {
  return _formsReducer (state, action);
}