import * as React from 'react';

import './App.css';
import { PersonMatrix } from '../PersonMatrix';

const App = () => {
  return (
    <div>
      <div className="wideScreenContainer">
        <PersonMatrix birthday="10.09.1985" />
        <PersonMatrix birthday="23.06.1987" />
      </div>
    </div>
  );
};

export default App;
