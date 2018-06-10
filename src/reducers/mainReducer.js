import { combineReducers } from 'redux';

import userReducer from './userReducer';
import ecgResultReducer from './ecgResultReducer';
import appCommonParamsReducer from './appCommonParamsReducer';

const rootReducer = combineReducers({
  appCommonParams: appCommonParamsReducer,
  ecgResult: ecgResultReducer,
  user: userReducer,
});

export default rootReducer;
