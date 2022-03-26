import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../stores';
import FxSpot from '../modules/FxSpot';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <FxSpot />
    </Provider>
  );
};

export default App;
