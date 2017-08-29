import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import MenuReducer from './reducer_menu';
import SummaryReducer from './reducer_summary';
import ErrorReducer from './reducer_error';

const rootReducer = combineReducers({
  menu: MenuReducer,
  summary: SummaryReducer,
  error: ErrorReducer,
  form: formReducer,
});

export default rootReducer;
