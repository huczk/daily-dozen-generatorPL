import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import MenuReducer from './reducer_menu.js';
import SummaryReducer from './reducer_summary.js';
import ErrorReducer from './reducer_error.js'

const rootReducer = combineReducers({
  menu: MenuReducer,
  summary: SummaryReducer,
  error: ErrorReducer,
  form: formReducer
});

export default rootReducer;
