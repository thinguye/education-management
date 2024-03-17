import { useSelector } from "react-redux";
import { useState } from "react";

import { ThemeProvider } from "@mui/material/styles";
import {
  Box,
  CircularProgress,
  CssBaseline,
  LinearProgress,
  StyledEngineProvider,
} from "@mui/material";

// routing
import Routes from "routes";

// defaultTheme
import themes from "themes";

// project imports
import NavigationScroll from "layout/NavigationScroll";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// ==============================|| APP ||============================== //

const App = () => {
  const [loading, setLoading] = useState(true);
  const customization = useSelector((state) => state.customization);
  const location = useLocation();
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [location.pathname]);
  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          <NavigationScroll>
            <Routes />
          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
};

export default App;
