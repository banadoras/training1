import { createContext, useState } from "react";

const ErrorContext = createContext();

const ErrorProvider = function (props) {
  const [error, setError] = useState(null);
  return (
    <ErrorContext.Provider value={[error, setError]}>
      {props.children}
    </ErrorContext.Provider>
  );
};

export { ErrorContext, ErrorProvider };
