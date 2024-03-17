import { Snackbar } from "@mui/material";
import { Alert, AlertTitle, Fade } from "@mui/material";
import React, { useMemo, useState, useEffect } from "react";

const AlertDialog = ({ type, title, message, showAlert, handleClose }) => {
const vertical = "bottom"
const horizontal ="right"
  return (
    <Snackbar  anchorOrigin={{ vertical, horizontal }} open={showAlert} autoHideDuration={3000} onClose={handleClose}>
      <Alert severity={type}>
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};
export default AlertDialog;
