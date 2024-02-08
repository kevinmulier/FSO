import React from 'react';
import ReactDOM from 'react-dom/client';

import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

const App = () => {
  const dispatcher = (type) => {
    store.dispatch({
      type: `${type.toUpperCase()}`,
    });
  };

  return (
    <div>
      <button onClick={() => dispatcher('good')}>good</button>
      <button onClick={() => dispatcher('ok')}>ok</button>
      <button onClick={() => dispatcher('bad')}>bad</button>
      <button onClick={() => dispatcher('zero')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
