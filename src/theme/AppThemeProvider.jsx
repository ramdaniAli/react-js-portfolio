import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material";
import { frFR } from "@mui/material/locale";
import { CssBaseline } from "@mui/material";
import PropTypes from "prop-types";
import appTheme from "./appTheme";
import "typeface-oswald";
import "@fontsource-variable/comfortaa";
import "./index.css";

const AppThemeProvider = ({ children }) => {
  const theme = responsiveFontSizes(createTheme(appTheme["dark"], frFR));
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AppThemeProvider;

AppThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
