import { createContext, useState } from "react";
import PropTypes from "prop-types";

const DrawerContext = createContext({ open: false });

export const DrawerProvider = ({ children }) => {
  const [open, setopen] = useState(false);

  const toggleDrawerState = () => {
    setopen(!open);
  };

  const closeDrawer = () => {
    setopen(false);
  };

  return (
    <DrawerContext.Provider
      value={{
        open,
        toggleDrawerState,
        closeDrawer,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

DrawerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DrawerContext;
