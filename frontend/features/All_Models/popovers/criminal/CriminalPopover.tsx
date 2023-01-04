import React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Box from "@mui/material/Box";
import TrackCriminal from "./TrackCriminal";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AddCriminalForm from "./AddCriminalForm";

function CriminalPopover({
  anchorEl,
  setAnchorEl,
  id,
}: {
  anchorEl: any;
  setAnchorEl: any;
  id: any;
}) {

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorReference="anchorPosition"
        anchorEl={anchorEl}
        onClose={handleClose}
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
        <Box sx={{ background: "#202126",width: "529px",height:'100vh' }}>
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
                  Track Criminal
                </Typography>
              </Box>
              <TabList onChange={handleChange} indicatorColor="primary" >
                <Tab label="Add a Criminal" value="1" sx={{color:'#FFFFFF'}}/>
                <Tab label="Track a Criminal" value="2" sx={{color:'#FFFFFF'}}/>
              </TabList>
            </Box>

            <TabPanel value="1" sx={{py:0}}>
              <AddCriminalForm handleClose={handleClose}/>
            </TabPanel>

            <TabPanel value="2" sx={{py:0}}>
              <TrackCriminal />
            </TabPanel>
          </TabContext>
        </Box>
      </Popover>
    </>
  );
}

export default CriminalPopover;
