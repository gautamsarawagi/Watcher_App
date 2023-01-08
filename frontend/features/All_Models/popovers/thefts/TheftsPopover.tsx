import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Image from "next/image";
import theft_background from "../../../../assets/thefts_background.png";

function TheftsPopover({
  anchorEl,
  setAnchorEl,
  id,
  setActiveTab
}: {
  anchorEl: any;
  setAnchorEl: any;
  id: any;
  setActiveTab: any;
}) {
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const color = "";

  const openCriminalPopover = () => {
    setActiveTab("Track Criminal")
  }

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
        <Box sx={{ background: "#202126", height: "105vh", width: "523px" }}>
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
              sx={{ svg: { color }, cursor: "pointer" }}
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
              Track Thefts
            </Typography>
          </Box>

          {/* theft */}
          <Box sx={{ px: 3, marginTop: "50px" }}>
            <Typography
              fontFamily={"Poppins"}
              fontStyle={"SemiBold"}
              fontSize={"40px"}
              fontWeight={"600"}
              lineHeight={"48px"}
              color={"#FFFFFF"}
            >
              Thefts in Tracking
            </Typography>

            <Typography
              fontFamily={"Poppins"}
              fontStyle={"SemiBold"}
              fontSize={"20px"}
              fontWeight={"400"}
              lineHeight={"24px"}
              color={"#D9D9D9"}
              sx={{ marginTop: "8px" }}
            >
              We can implement this feature in future hang on with us for this
              feature.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "34px",
            }}
          >
            <Image src={theft_background} alt={""} />
          </Box>


          <Box sx={{px:3}}>
          <Button
            sx={{
              border: "1px solid #008DFF",
              borderRadius: "5px",
              background: "#008DFF",
              height: "48px",
              marginTop: "76px",
            }}
            fullWidth
            onClick={openCriminalPopover}
          >
            <Typography
              fontFamily={"Poppins"}
              fontStyle={"SemiBold"}
              fontWeight={"600"}
              fontSize={"20px"}
              lineHeight={"24px"}
              color={"#FFFFFF"}
            >
              Find your Criminal
            </Typography>
          </Button>
          </Box>
          
        </Box>
      </Popover>
    </>
  );
}

export default TheftsPopover;