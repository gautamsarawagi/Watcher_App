import React from "react";
import Box from "@mui/material/Box";
import Image from "next/image";
import logo from "../../assets/logo.png";
import Typography from "@mui/material/Typography";
import Toolbar from '@mui/material/Toolbar';

function Footer() {
  return (
    <>
      <Box sx={{ marginTop: "56px", background: "#000C15",padding:'101px'}}>
      <Toolbar>
        <div style={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <Image src={logo} alt="logo" />
          <Typography
            fontFamily={"Poppins"}
            fontStyle={"Bold"}
            fontWeight={"400"}
            fontSize={"40px"}
            lineHeight={"60px"}
            color={"#34353A"}
          >
            WATCHER
          </Typography>
        </div>

        <Typography
          fontFamily={"Poppins"}
          fontStyle={"Medium"}
          fontWeight={"400"}
          fontSize={"24px"}
          lineHeight={"36px"}
          color={"#34353A"}
        >
          Copyright Ⓒ 2022  Watcher All rights reserved
        </Typography>
       </Toolbar> 
      </Box>
    </>
  );
}

export default Footer;
