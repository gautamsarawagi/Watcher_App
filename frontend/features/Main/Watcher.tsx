import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import watcher from "../../assets/watcher.png";

type Props = {};

function Watcher({}: Props) {

  return (
    <>
      <Grid
        container
        columnSpacing={"24px"}
        direction="row"
        justifyContent="center"
        alignItems="center"
        rowGap={"56px"}
        mt={"220px"}
      >
        <Grid xs={6}>
          <Box sx={{ maxWidth: "608px" }}>
            <Typography
              fontFamily={"Poppins"}
              fontStyle={"Bold"}
              fontWeight={"600"}
              fontSize={"120px"}
              lineHeight={"180px"}
              color={"#FFFFFF"}
            >
              What is <span style={{ color: "#008DFF" }}>WATCHER</span>
            </Typography>
          </Box>
          <Box sx={{ marginTop: "56px" }}>
            <Typography
              fontFamily={"Poppins"}
              fontStyle={"Medium"}
              fontSize={"24px"}
              lineHeight={"36px"}
              color={"#FFFFFF"}
            >
              Watcher is a cutting-edge security protocol that uses different
              deep learning models and artificial intelligence to track motor
              vehicles, criminals, theft and illegal trespassing via a modern
              CCTV network. We do not simply watch their movements; we also
              serve as a GPS for the massive network of traffic that passes
              through our city every day, allowing concerned authorities to keep
              an eye on these activity through out the city.{" "}
            </Typography>
          </Box>
        </Grid>

        <Grid xs={6}>
          <Box sx={{display:'flex',justifyContent:'center'}}>
            <Image
              src={watcher}
              alt="hero_part"
              object-fit="contain"
              width={450}
              height={508}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Watcher;

// What is WATCHER
