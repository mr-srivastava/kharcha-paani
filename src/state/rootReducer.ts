import { combineReducers } from 'redux';
import { groups, groupPage } from './Reducers/group';

export const rootReducer = combineReducers({
  group: groupPage,
  groups,
});

export type RootState = ReturnType<typeof rootReducer>;
