import axios from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { getApiUrl } from 'src/utils';

const API_BASE = getApiUrl();

const getAllGroups = () => {
  return axios.get(`${API_BASE}/api/group/`);
};

function* getGroups(action: any): Generator<any> {
  try {
    const response: any = yield call(getAllGroups);
    if (response.status === 200) {
      action.resolve(response.data);
    }
    // yield put({ type: 'GET_ALL_GROUPS_SUCCESS', user: user });
  } catch (e) {
    // yield put({ type: 'GET_ALL_GROUPS_FAILURE', message: e.message });
  }
}

const getGroupById = (id: string) => {
  return axios.get(`${API_BASE}/api/group/${id}`);
};

function* getGroup(action: any): Generator<any> {
  try {
    const response: any = yield call(getGroupById, action.id);
    if (response.status === 200) {
      action.resolve(response.data);
    }
    // yield put({ type: 'GET_ALL_GROUPS_SUCCESS', user: user });
  } catch (e) {
    // yield put({ type: 'GET_ALL_GROUPS_FAILURE', message: e.message });
  }
}

const createNewGroup = (payload: any) => {
  return axios.post(`${API_BASE}/api/group/`, payload);
};

function* createGroup(action: any): Generator<any> {
  try {
    const response: any = yield call(createNewGroup, action.payload);
    if (response.status === 200) {
      action.resolve(response.data);
    }
    // yield put({ type: 'GET_ALL_GROUPS_SUCCESS', user: user });
  } catch (e) {
    // yield put({ type: 'GET_ALL_GROUPS_FAILURE', message: e.message });
  }
}

const updateGroupCall = (payload: any) => {
  const { id, payloadData } = payload;

  return axios.put(`${API_BASE}/api/group/${id}`, payloadData);
};

function* updateGroup(action: any): Generator<any> {
  try {
    const response: any = yield call(updateGroupCall, action.payload);
    if (response.status === 200) {
      action.resolve(response.data);
    }
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
  yield takeLatest('GET_GROUP_BY_ID', getGroup);
  yield takeLatest('ADD_GROUP', createGroup);
  yield takeLatest('UPDATE_GROUP', updateGroup);
}

export default groupSaga;
