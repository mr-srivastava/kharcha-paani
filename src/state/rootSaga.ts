import { all, fork } from "redux-saga/effects";
import groupSaga from "./Sagas/groupSaga";

export function* rootSaga() {
  yield all([fork(groupSaga)]);
}
