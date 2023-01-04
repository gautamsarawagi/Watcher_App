import React, { useState } from "react";
import Box from "@mui/material/Box";
import HomeStyles from "../../styles/Home.module.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";

import { useRouter } from "next/router";

function CriminalDescription() {
  const router = useRouter();

  const imagesrc = router?.query?.image?.replace(/[{()}]/g, "");
  
  const [imageFounded, setImageFounded] = useState(false);

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection:'column'
        }}
        columnGap={"45px"}
        className={HomeStyles.body}
      >
        <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection:'row'
        }}
        columnGap="54px"
        >
        <Image src={imagesrc} alt={""} width={500} height={500} />
        {imageFounded ? (
          <>
            <Image src={imagesrc} alt={""} width={500} height={500} />
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
            >
              Finding the image pls wait
            </Typography>
            <CircularProgress color="secondary" />
          </Box>
        )}
        </Box>

          <Typography
              fontFamily={"Poppins"}
              fontStyle={"SemiBold"}
              fontWeight={"600"}
              fontSize={"32px"}
              lineHeight={"48px"}
              color={"#FFFFFF"}
              sx={{marginTop:'50px'}}
            >
              Description of the Image Founded: 
            </Typography>
      </Box>
    </>
  );
}

export default CriminalDescription;