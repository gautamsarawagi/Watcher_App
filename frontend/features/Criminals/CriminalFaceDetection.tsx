import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

const CriminalFaceDetection = () => {
  const router = useRouter();

  const webcam = useRef<Webcam>(null);
  const videoConstraints = {
    width: 800,
    height: 800,
    facingMode: "user",
  };

  const [allowed, setAllowed] = useState(false);
  const [picture, setPicture] = useState("");

  const grantPermission = () => {
    setAllowed(true);
  };

  const capture = () => {
    const pictureScreenshot = webcam?.current?.getScreenshot();
    {
      pictureScreenshot ? setPicture(pictureScreenshot) : null;
    }

    router.push({
      pathname : "/criminal/CriminalDescription"
    })
  };

  return (
    <>
      {!allowed ? (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            sx={{
              border: "1px solid #008DFF",
              borderRadius: "10px",
              background: "#008DFF",
              width: "462px",
              height: "64px",
            }}
            onClick={grantPermission}
          >
            <Typography
              fontFamily={"Poppins"}
              fontStyle={"SemiBold"}
              fontWeight={"600"}
              fontSize={"32px"}
              lineHeight={"48px"}
              color={"#FFFFFF"}
            >
              Open Webcam
            </Typography>
          </Button>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            rowGap={"32px"}
          >
            <Webcam
              audio={false}
              ref={webcam}
              videoConstraints={videoConstraints}
              width={700}
            />

            <Button
              sx={{
                border: "1px solid #008DFF",
                borderRadius: "10px",
                background: "#008DFF",
                width: "462px",
                height: "64px",
              }}
              onClick={capture}
            >
              <Typography
                fontFamily={"Poppins"}
                fontStyle={"SemiBold"}
                fontWeight={"600"}
                fontSize={"32px"}
                lineHeight={"48px"}
                color={"#FFFFFF"}
              >
                Capture
              </Typography>
            </Button>
          </Box>
        </>
      )}
    </>
  );
};
export default CriminalFaceDetection;
