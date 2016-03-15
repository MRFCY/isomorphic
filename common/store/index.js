import {applyMiddleware, createStore as _createStore} from 'redux';
import middlewares from '../middlewares';
import rootReducer from '../reducers';

const hasReduxDevTool = () => {
  return process.browser
    && window.DEV !== 'production'
    && window.devToolsExtension;
};

export default (initialState) => {
  const create = hasReduxDevTool()
    ? window.devToolsExtension()(_createStore)
    : _createStore;

  const createStore = applyMiddleware(...middlewares)(create);
  const store = createStore(rootReducer, initialState);

  module.hot && module.hot.accept('../reducers', () => {
    store.replaceReducer(require('../reducers'));
  });

  return store;
};
