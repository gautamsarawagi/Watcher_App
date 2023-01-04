import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TrackComplaintPlateNo from "./TrackComplaintPlateNo";
import TrackComplaintWebcam from "./TrackComplaintWebcam";

function TrackComplaint() {
  return (
    <>
        <TrackComplaintPlateNo />
        <Box sx={{ margin: "15px 0" }}>
          <Divider color={"#34353A"} />
        </Box>
        <TrackComplaintWebcam />
    </>
  );
}

export default TrackComplaint;
