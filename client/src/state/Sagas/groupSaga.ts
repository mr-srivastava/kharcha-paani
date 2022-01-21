import axios from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { getApiUrl } from 'src/utils';

const API_BASE = getApiUrl();

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
const getAllGroups = (): Promise<any> => {
  return axios.get(`${API_BASE}/api/group/`);
};
function* getGroups(): Generator<any> {
  try {
    const groups = yield call(getAllGroups);
    console.log(groups);
    // yield put({ type: 'GET_ALL_GROUPS_SUCCESS', user: user });
  } catch (e) {
    // yield put({ type: 'GET_ALL_GROUPS_FAILURE', message: e.message });
  }
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* groupSaga() {
  yield takeLatest('GET_ALL_GROUPS', getGroups);
}

export default groupSaga;
