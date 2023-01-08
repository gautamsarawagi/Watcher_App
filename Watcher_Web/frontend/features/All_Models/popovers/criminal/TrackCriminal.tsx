import React from 'react'
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TrackCriminalbyName from './TrackCriminalbyName';
import TrackCriminalbyWebcam from './TrackCriminalbyWebcam';

function TrackCriminal() {
  return (
    <>
    <TrackCriminalbyName/>
    <Box sx={{ margin: "15px 0" }}>
          <Divider color={"#34353A"} />
    </Box>
    <TrackCriminalbyWebcam/>
    </>
  )
}

export default TrackCriminal