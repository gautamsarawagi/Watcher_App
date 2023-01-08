import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

type Props = {};

function Contact({}: Props) {
  return (
    <>
      <Typography
        fontFamily={"Poppins"}
        fontStyle={"Bold"}
        fontSize={"96px"}
        lineHeight={"144px"}
        color={"#FFFFFF"}
        sx={{ textAlign: "center", marginTop: "220px" }}
      >
        Let’s <span style={{ color: "#008DFF" }}>Connect</span>
      </Typography>

      <Box
        sx={{
          marginTop: "60px",
          border: "1px solid #202126",
          borderRadius: "18px",
          p: 3,
          background: "#202126",
        }}
      >
        <Grid container columnSpacing={"24px"}>
          <Grid xs={6} px={3}>
            <Typography
              fontFamily={"Poppins"}
              fontStyle={"SemiBold"}
              fontSize={"33px"}
              lineHeight={"48px"}
              color={"#FFFFFF"}
            >
              Your Name
            </Typography>

            <TextField
              id="margin-none"
              fullWidth
              inputProps={{ style: { color: "#FFFFFF" } }}
              multiline
              rows={1}
              maxRows={2}
              sx={{
                background: "#34353A",
                border: "0.2px solid #34353A",
                borderRadius: "8px",
                marginTop: "15px",
              }}
              placeholder="Enter your Full Name"
            />
          </Grid>

          <Grid xs={6} px={3}>
            <Typography
              fontFamily={"Poppins"}
              fontStyle={"SemiBold"}
              fontSize={"33px"}
              lineHeight={"48px"}
              color={"#FFFFFF"}
            >
              Contact Information
            </Typography>

            <TextField
              id="margin-none"
              fullWidth
              multiline
              rows={1}
              maxRows={2}
              inputProps={{ style: { color: "#FFFFFF" } }}
              sx={{
                background: "#34353A",
                border: "0.2px solid #34353A",
                borderRadius: "8px",
                marginTop: "15px",
              }}
              placeholder="Enter your email id/phone number"
            />
          </Grid>
        </Grid>

        <Typography
          fontFamily={"Poppins"}
          fontStyle={"SemiBold"}
          fontSize={"33px"}
          lineHeight={"48px"}
          color={"#FFFFFF"}
          sx={{ marginTop: "30px" }}
        >
          Message
        </Typography>

        <TextField
          id="margin-none"
          fullWidth
          multiline
          rows={3}
          maxRows={4}
          inputProps={{ style: { color: "#FFFFFF" } }}
          sx={{
            background: "#34353A",
            border: "0.2px solid #34353A",
            borderRadius: "8px",
            marginTop: "15px",
          }}
          placeholder="Write your message here"
        />
      </Box>
    </>
  );
}

export default Contact;
