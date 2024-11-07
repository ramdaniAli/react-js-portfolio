import { createContext, useState } from "react";
import PropTypes from "prop-types";

const TransitionContext = createContext({ completed: false });

export const TransitionProvider = ({ children }) => {
  const [completed, setCompleted] = useState(false);
  const [flipState, setFlipState] = useState(null);

  const toggleCompleted = (value) => {
    setCompleted(value);
  };

  const saveFlipState = (elmt) => {
    setFlipState(elmt);
  };

  return (
    <TransitionContext.Provider
      value={{
        completed,
        toggleCompleted,
        flipState,
        saveFlipState,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

TransitionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TransitionContext;
