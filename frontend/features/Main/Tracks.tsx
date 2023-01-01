import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { trackDetails } from "./AllTracks";
import Image from "next/image";

type Props = {};

function Tracks({}: Props) {
  return (
    <>
      <Box
        sx={{
          maxWidth: "1150px",
          marginTop: "220px",
          display: "flex",
          mx: "auto",
        }}
      >
        <Typography
          fontFamily={"Poppins"}
          fontStyle={"Bold"}
          fontSize={"96px"}
          lineHeight={"144px"}
          color={"#FFFFFF"}
          sx={{ textAlign: "center" }}
        >
          Our solutions are at the{" "}
          <span style={{ color: "#008DFF" }}>forefront</span> of{" "}
          <span style={{ color: "#008DFF" }}>innovation</span>.
        </Typography>
      </Box>

      <Typography
        fontFamily={"Poppins"}
        fontStyle={"SemiBold"}
        fontSize={"32px"}
        lineHeight={"48px"}
        color={"#FFFFFF"}
        sx={{ textAlign: "center" }}
      >
        Introducing
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          columnGap: "138px",
          mt: "98px",
        }}
      >
        {trackDetails.map((item, index) => {
          return (
            <>
              <Box
                sx={{
                  width: "381px",
                  height:'300px',
                  border: "1px solid #34353A",
                  borderRadius: "18px",
                  background: "#34353A",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent:'center'
                }}
                key={index}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                />
                <Typography
                  fontFamily={"Poppins"}
                  fontStyle={"SemiBold"}
                  fontSize={"56px"}
                  lineHeight={"84px"}
                  color={"#FFFFFF"}
                  sx={{ textAlign: "center" }}
                >
                  {item.name}
                </Typography>

                <Typography
                  fontFamily={"Poppins"}
                  fontStyle={"SemiBold"}
                  fontSize={"24px"}
                  lineHeight={"36px"}
                  color={"#008DFF"}
                  sx={{ textAlign: "center" }}
                >
                  {item.details}
                </Typography>
              </Box>
            </>
          );
        })}
      </Box>
    </>
  );
}

export default Tracks;
