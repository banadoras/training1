import { createContext, useState } from "react";

const ErrorContext = createContext();

const ErrorProvider = function (props) {
  const [loginError, setError] = useState(null);
  return (
    <ErrorContext.Provider value={[loginError, setError]}>
      {props.children}
    </ErrorContext.Provider>
  );
};

export { ErrorContext, ErrorProvider };
