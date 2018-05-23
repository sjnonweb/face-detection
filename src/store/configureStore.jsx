import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

// reducers
import userReducer from '../reducers/userReducer';
import faceReduer from '../reducers/faceReducer';

export const configureStore = () => {
  const reducer = combineReducers({
    user: userReducer,
    face: faceReduer,
  });

  const store = createStore(
    reducer,
    compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f)
  );
  return store;
}
