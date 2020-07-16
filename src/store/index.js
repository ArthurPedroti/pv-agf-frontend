import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './ducks';

const middleware = [thunk];

const dev = (
  (window || {}).__REDUX_DEVTOOLS_EXTENSION__ || (() => store => store)
)();

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  compose(applyMiddleware(...middleware), dev),
);
const persistor = persistStore(store);

export { store, persistor };
