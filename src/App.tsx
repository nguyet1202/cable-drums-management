import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import MainRouter from "./routers/MainRouter";
import {Provider} from 'react-redux';
import store from "./store/store";

function App() {
   return (
      <Provider store={store}>
         <BrowserRouter>
            <MainRouter/>
         </BrowserRouter>
      </Provider>
   );
}

export default App;
