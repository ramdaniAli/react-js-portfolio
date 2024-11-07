import { Fragment, useContext } from "react";

import MenuDrawer from "components/MenuDrawer";
import MenuHeader from "components/MenuHeader";
import DrawerContext from "context/DrawerProviderContext";

import { Outlet } from "react-router-dom";

const Navigation = () => {
  const { open } = useContext(DrawerContext);

  return (
    <Fragment>
      {/* APPBAR */}
      <MenuHeader />
      {/* DRAWER */}
      {open && <MenuDrawer />}

      <Outlet />
    </Fragment>
  );
};

export default Navigation;
