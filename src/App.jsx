import React from "react";
import ReactDOM from "react-dom";

import ButtonContainer from "./ButtonContainer";

const App = () => (
  <div>
    <ButtonContainer />
    <div>ButtonContainer project</div>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
