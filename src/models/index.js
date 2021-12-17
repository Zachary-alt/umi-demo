import {getUserInfo} from '../server/index';
export default {
  namespace: 'system',
  state: {
    userInfo:{
      name:''
    }
  },
  reducers: {
    'login'(state, { payload: userInfo }) {
      window.localStorage.setItem('token',123);
      console.log(123,userInfo);
      return {
        ...state,
        userInfo,
      };
    },
  },
  effects: {
    *userInfo({ payload }, { call, put }) {
      const { data } = yield call(getUserInfo);
      yield put({ type: 'login', payload:  data });
    },
  },
};