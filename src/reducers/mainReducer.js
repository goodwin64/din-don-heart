import { combineReducers } from 'redux';

import ecgResultReducer from './ecgResultReducer';
import appCommonParamsReducer from './appCommonParamsReducer';

const rootReducer = combineReducers({
  appCommonParams: appCommonParamsReducer,
  ecgResult: ecgResultReducer,
});

export default rootReducer;
