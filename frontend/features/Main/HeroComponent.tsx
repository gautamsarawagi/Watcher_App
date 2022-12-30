import Image from "next/image";
import React from "react";
import hero from "../../assets/hero_index.png";
import Box from "@mui/material/Box";

type Props = {};


function HeroComponent({}: Props) {
  return (
    <>
    <Box sx={{width:'100%', maxHeight:"970px",display:'flex',justifyContent:'center',alignItems:'center',p:2,marginTop:'99px' }}>
    <Image src={hero} alt="hero_part" width={1200} />
    </Box>
    </>
  );
}

export default HeroComponent;
