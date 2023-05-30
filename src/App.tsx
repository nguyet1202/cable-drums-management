import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {BasedRouting} from "./routes";

function App() {
   return (
      <BrowserRouter>
         <BasedRouting/>
      </BrowserRouter>
   );
}

export default App;
