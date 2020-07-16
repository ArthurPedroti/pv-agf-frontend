import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { SW_INIT, SW_UPDATE } from './store/serviceWorker/types';
import { store } from './store/index';

import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register({
  onSuccess: () => store.dispatch({ type: SW_INIT }),
  onUpdate: registration =>
    store.dispatch({ type: SW_UPDATE, payload: registration }),
});
