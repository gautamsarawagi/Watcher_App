import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function MessageTooltip({
  openTooltip,
  setOpenTooltip,
  message,
}: {
  openTooltip: any;
  setOpenTooltip: any;
  message: any;
}) {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenTooltip(false);
  };
  
  return (
    <>
      <Snackbar
        open={openTooltip}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={message?.Status}
          sx={{ width: "100%" }}
        >
          {message.msg}
        </Alert>
      </Snackbar>
    </>
  );
}

export default MessageTooltip;
