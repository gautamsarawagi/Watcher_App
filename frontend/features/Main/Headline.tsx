import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";

type Props = {};

function Headline({}: Props) {


  return (
    <>
      <Typography
        fontFamily={"Poppins"}
        fontStyle={"normal"}
        fontWeight={"700"}
        fontSize={"96px"}
        lineHeight={"144px"}
        color={"#FFFFFF"}
        sx={{ marginTop: "108px", display: "flex", justifyContent: "center" }}
      >
        Advance. <span style={{ color: "#008DFF" }}>Secure</span> Network.
      </Typography>

      <Typography
        fontFamily={"Poppins"}
        fontStyle={"normal"}
        fontWeight={"500"}
        fontSize={"24px"}
        lineHeight={"36px"}
        color={"#FFFFFF"}
        sx={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
        Unleashing the power of artificial intelligence to protect you and your
        assets
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center",marginTop:'29px' }}>
        <Link href="/vehicle">
        <Button sx={{width:'280px',height:"64px",border:'1px solid #008DFF',borderRadius:'10px',background:'#008DFF'}}>
        <Typography
        fontFamily={"Poppins"}
        fontStyle={"normal"}
        fontWeight={"600"}
        fontSize={"32px"}
        lineHeight={"48px"}
        color={"#FFFFFF"}
      >
       Login
      </Typography>
        </Button>
        </Link>
        
      </Box>
    </>
  );
}

export default Headline;
