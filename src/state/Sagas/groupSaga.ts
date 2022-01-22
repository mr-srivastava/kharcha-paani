import axios from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { getApiUrl } from 'src/utils';

const API_BASE = getApiUrl();

const getAllGroups = () => {
  return axios.get(`${API_BASE}/api/group/`);
};

function* getGroups(): Generator<any> {
  try {
    yield put({ type: 'SET_ALL_GROUPS_LOADING' });
    const response: any = yield call(getAllGroups);
    yield put({ type: 'GET_ALL_GROUPS_SUCCESS', groups: response.data.groups });
  } catch (e) {
    yield put({ type: 'GET_ALL_GROUPS_FAILURE' });
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
      yield put({ type: 'GET_ALL_GROUPS' });
    }
  } catch (e) {
    // yield put({ type: 'GET_ALL_GROUPS_FAILURE', message: e.message });
  }
}

const deleteGroupById = (id: string) => {
  return axios.delete(`${API_BASE}/api/group/${id}`);
};

function* deleteGroup(action: any): Generator<any> {
  try {
    const response: any = yield call(deleteGroupById, action.id);
    if (response.status === 200) {
      yield put({ type: 'GET_ALL_GROUPS' });
    }
  } catch (e) {
    // yield put({ type: 'GET_ALL_GROUPS_FAILURE', message: e.message });
  }
}

function* groupSaga() {
  yield takeLatest('GET_ALL_GROUPS', getGroups);
  yield takeEvery('GET_GROUP_BY_ID', getGroup);
  yield takeEvery('ADD_GROUP', createGroup);
  yield takeEvery('UPDATE_GROUP', updateGroup);
  yield takeEvery('DELETE_GROUP', deleteGroup);
}

export default groupSaga;
