import React, { useState } from "react";
import Box from "@mui/material/Box";
import HomeStyles from "../../styles/Home.module.css";
import Typography from "@mui/material/Typography";
import Image from "next/image";

import { useRouter } from "next/router";

function CriminalDescription() {
  const router = useRouter();

  console.log(router.query);

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        columnGap={"45px"}
        className={HomeStyles.body}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
          columnGap="84px"
        >
          <Box sx={{ borderRadius: "30px", overflow: "hidden" }}>
            <Image
              src={router.query.imageCaptured}
              alt={""}
              width={400}
              height={400}
            />
          </Box>
          <Box sx={{ borderRadius: "30px", overflow: "hidden" }}>
            <Image
              src={router.query.imageMatched}
              alt={""}
              width={400}
              height={400}
            />
          </Box>
        </Box>

        <Typography
          fontFamily={"Poppins"}
          fontStyle={"SemiBold"}
          fontWeight={"600"}
          fontSize={"32px"}
          lineHeight={"48px"}
          color={"#FFFFFF"}
          sx={{ marginTop: "50px" }}
        >
          Name: {router.query.name}
        </Typography>

        <Typography
          fontFamily={"Poppins"}
          fontStyle={"SemiBold"}
          fontWeight={"600"}
          fontSize={"32px"}
          lineHeight={"48px"}
          color={"#FFFFFF"}
          sx={{ marginTop: "50px" }}
        >
          Age: {router.query.age}
        </Typography>
      </Box>
    </>
  );
}

export default CriminalDescription;
