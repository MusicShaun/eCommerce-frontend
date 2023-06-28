import { RootState } from './store';
import { store } from './store';

export const getAuthEmail = () => {
  const state = store.getState();
  return state.auth.email;
}
