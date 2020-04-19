import React from 'react';
import Portrait from './Portrait';
import Selector from './Selector';
import ComponentTabs from './ComponentTabs';

import { AppProvider } from './context/AppContext';

const App = () => {
  
  return (
    <AppProvider>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-lg-6">
            <Portrait />
          </div>
          <div className="col-xs-12 col-lg-6">
            {<ComponentTabs />}
            <Selector />
          </div>
        </div>
      </div>"
    </AppProvider>
  );
}

export default App;
