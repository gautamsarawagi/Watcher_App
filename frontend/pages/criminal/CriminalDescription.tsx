import React from 'react'
import Box from "@mui/material/Box";
import HomeStyles from "../../styles/Home.module.css"
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
function CriminalDescription() {
  return (
    <>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      columnGap={"45px"}
    >
      {/* <Image src={picture} alt={""} width={500} height={500} /> */}
      {/* {imageFounded ? (
        <>
          <Image src={picture} alt={""} width={500} height={500} />
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          rowGap={"45px"}
        >
          <Typography
            fontFamily={"Poppins"}
            fontStyle={"SemiBold"}
            fontWeight={"600"}
            fontSize={"32px"}
            lineHeight={"48px"}
            color={"#FFFFFF"}
            onClick={capture}
          >
            Finding the image pls wait
          </Typography>
          <CircularProgress color="secondary" />
        </Box>
      )} */}
    </Box>
  </>
  )
}

export default CriminalDescription