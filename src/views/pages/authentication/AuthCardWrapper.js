import PropTypes from "prop-types";

// material-ui
import { Box } from "@mui/material";

// project import
import MainCard from "ui-component/cards/MainCard";

// ==============================|| AUTHENTICATION CARD WRAPPER ||============================== //

const AuthCardWrapper = ({ children, ...other }) => (
  <MainCard
    sx={{
      maxHeight: { xs: "100vh", lg: "100vh" },
      maxWidth: { xs: 400, lg: 400 },
      margin: { xs: 2, sm: 2, md: 2 },
      "& > *": {
        flexGrow: 1,
        flexBasis: "50%",
      },
    }}
    content={false}
    {...other}
  >
    <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>{children}</Box>
  </MainCard>
);

AuthCardWrapper.propTypes = {
  children: PropTypes.node,
};

export default AuthCardWrapper;
