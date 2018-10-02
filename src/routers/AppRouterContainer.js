import React from 'react';
import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
// import flow from 'lodash/flow';

import AppRouter from './AppRouter';

export const history = createHistory();

const AppRouterContainer = () => (
  <Router history={history} >
    <div>
      <AppRouter />
    </div>
  </Router>
);

// export default flow(
//   DragDropContext(HTML5Backend),
//   withRouter(AppRouter)
// );

export default DragDropContext(HTML5Backend)(AppRouterContainer);
