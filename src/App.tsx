import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {MainRouting} from "./routes";
import { Provider } from 'react-redux';
import store from "./store/store";
function App() {
   return (
      <Provider store={store}>
         <BrowserRouter>
            <MainRouting />
         </BrowserRouter>
      </Provider>
   );
}

export default App;
