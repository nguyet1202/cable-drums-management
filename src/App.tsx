import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {MainRouting} from "./routes";
function App() {
   return (
      <BrowserRouter>
         <MainRouting/>
      </BrowserRouter>
   );
}

export default App;