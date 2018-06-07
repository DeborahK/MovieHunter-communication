import { User } from '../user';

/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActions, UserActionTypes } from './user.actions';

// State for this feature (User)
export interface UserState {
  currentUser: User | null;
}

const initialState: UserState = {
  currentUser: null
};

// Selector functions
const getMovieFeatureState = createFeatureSelector<UserState>('users');

export const getCurrentUser = createSelector(
  getMovieFeatureState,
  state => state.currentUser
);

export function reducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.SetCurrentUser:
      return {
        ...state,
        currentUser: action.payload
      };

    default:
      return state;
  }
}
