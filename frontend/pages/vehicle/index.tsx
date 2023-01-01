import React from 'react'
import Head from "next/head";
import VehicleTestingLayout from '../../layout/VehicleTestingLayout'
import HomeStyles from "../../styles/Home.module.css"
import Box from "@mui/material/Box"
import LocationMap from './LocationMap'

function Vehicle_testing() {
  
  return (
    <>
     <Head>
        <title>Watcher App | Vehicles </title>
        <meta name="description" content="Watcher Police help Web App" />
        <meta name="viewport" content="width=1200, minimum-scale=0.25" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     <Box className={HomeStyles.body}>
     <VehicleTestingLayout>
        {/* <LocationMap/> */}
      </VehicleTestingLayout>
     </Box>
      
    </>
  )
}

export default Vehicle_testing