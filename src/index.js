import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { ErrorProvider } from "./components/contexts/errorContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <ErrorProvider>
        <App />
      </ErrorProvider>
    </Router>
  </StrictMode>,
  rootElement
);
