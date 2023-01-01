import React from "react";

import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LicenseAddFrom from "./LicenseAddFrom";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PreviousLicenses from "./PreviousLicenses";
import TrackComplaint from "./TrackComplaint";

function LicensePopover({
  anchorEl,
  setAnchorEl,
  id,
}: {
  anchorEl: any;
  setAnchorEl: any;
  id: any;
}) {
  const open = Boolean(anchorEl);

  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorReference="anchorPosition"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        anchorPosition={{
          top: 0,
          left: 66,
        }}
      >
        <Box sx={{ background: "#202126", width: "529px" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: "13px",
                  px: 3,
                  paddingTop: "19px",
                  color: "white",
                }}
              >
                <KeyboardBackspaceIcon
                  sx={{ cursor: "pointer" }}
                  onClick={handleClose}
                />
                <Typography
                  fontFamily={"Poppins"}
                  fontStyle={"Regular"}
                  fontSize={"24px"}
                  lineHeight={"36px"}
                  color={"#FFFFFF"}
                >
                  Back
                </Typography>
              </Box>

              <Box
                sx={{
                  background: "#34353A",
                  width: "100%",
                  height: "80px",
                  display: "flex",
                  alignItems: "center",
                  px: 3,
                  marginTop: "11px",
                }}
              >
                <Typography
                  fontFamily={"Poppins"}
                  fontStyle={"SemiBold"}
                  fontSize={"32px"}
                  lineHeight={"48px"}
                  color={"#FFFFFF"}
                >
                  Track Vehicle
                </Typography>
              </Box>
              <TabList onChange={handleChange} indicatorColor="primary">
                <Tab label="File a Complaint" value="1" />
                <Tab label="Track a Complaint" value="2" />
              </TabList>
            </Box>

            <TabPanel value="1">
              <LicenseAddFrom handleClose={handleClose} />
            </TabPanel>

            <TabPanel value="2">
              <TrackComplaint />
            </TabPanel>
          </TabContext>
        </Box>
      </Popover>
    </>
  );
}

export default LicensePopover;
