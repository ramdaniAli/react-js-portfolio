import { Routes, Route } from "react-router-dom";

import { Suspense } from "react";
import { HomePage, NotFoundPage } from "bundles";

import { routesMap } from "config/routes";

import TextLoader from "components/TextLoader";

const Router = () => {
  return (
    <Routes>
      <Route path={routesMap.index}>
        <Route
          index
          path={routesMap.index}
          element={
            <Suspense fallback={<TextLoader />}>
              <HomePage />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="*"
        element={
          <Suspense fallback={null}>
            <NotFoundPage />
          </Suspense>
        }
      />
    </Routes>
  );
};
export default Router;
