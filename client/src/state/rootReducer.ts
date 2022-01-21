import { combineReducers } from 'redux';
import { GroupReducer } from './Reducers/group';

export const rootReducer = combineReducers({
  group: GroupReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
