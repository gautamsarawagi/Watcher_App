import React from "react";
import Head from "next/head";
import ModelLayout from "../../layout/ModelLayout";
import HomeStyles from "../../styles/Home.module.css";
import Box from "@mui/material/Box";
import CriminalDescription from "./CriminalDescription";

function Criminal_detection() {
  return (
    <>
      <Head>
        <title>Watcher App | Criminals </title>
        <meta name="description" content="Watcher Police help Web App" />
        <meta name="viewport" content="width=1200, minimum-scale=0.25" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box className={HomeStyles.body}>
        <ModelLayout>
          {/* <CriminalDescription/> */}
        </ModelLayout>
      </Box>
    </>
  );
}

export default Criminal_detection;
