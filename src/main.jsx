import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AppThemeProvider from "theme/AppThemeProvider";
import { TransitionProvider } from "context/TransitionProviderContext";
import { DrawerProvider } from "context/DrawerProviderContext";
import { SectionSliderProvider } from "context/SectionSliderContext";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppThemeProvider>
        <TransitionProvider>
          <DrawerProvider>
            <SectionSliderProvider>
              <HelmetProvider>
                <App />
              </HelmetProvider>
            </SectionSliderProvider>
          </DrawerProvider>
        </TransitionProvider>
      </AppThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
