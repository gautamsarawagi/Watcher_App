import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import MessageTooltip from "../../../MessageTooltip";

function LicenseAddFrom({ lat, lng }: { lat: any; lng: any }) {
  const color = "#FFFFFF";

  const [licenseForm, setLicenseForm] = useState({
    licenseNo: "",
    carModel: "",
    carColor: "",
    lastLocation: "",
    dateandtime: "12/22/2022 06:31 AM",
    latitude: lat,
    longitude: lng,
    complete_status: "solved",
  });

  const handleInputs = (e: {
    [x: string]: any;
    target: { name: any; value: any };
  }) => {
    if (e.target) {
      setLicenseForm({ ...licenseForm, [e.target.name]: e.target.value });
    } else {
      setLicenseForm({ ...licenseForm, dateandtime: e.$d });
    }
  };

  const [openTooltip, setOpenTooltip] = useState(false);
  const [tooltipMsg, setTooltipMsg] = useState({});

  const formSubmitHandler = async () => {
    const result = await axios
      .post(`http://127.0.0.1:8000/license`, {
        licenseNo: licenseForm.licenseNo,
        model: licenseForm.carModel,
        color: licenseForm.carColor,
        lastLocation: licenseForm.lastLocation,
        dateOfTheft: licenseForm.dateandtime,
        latitude: licenseForm.latitude,
        longitude: licenseForm.longitude,
        complete_status: licenseForm.complete_status,
      })
      .then((res) => {
        console.log(res);
      });

    setOpenTooltip(true);
    setTooltipMsg({
      Status: "success",
      msg: "License Plate Added Successfully",
    });
  };

  return (
    <>
      <Box sx={{ marginTop: "25px", px: 1 }}>
        <Typography
          fontFamily={"Poppins"}
          fontStyle={"Medium"}
          fontSize={"24px"}
          lineHeight={"36px"}
          color={"#FFFFFF"}
        >
          License Plate Number
        </Typography>

        <TextField
          id="margin-none"
          fullWidth
          multiline
          inputProps={{ style: { color: "#FFFFFF" } }}
          name={"licenseNo"}
          value={licenseForm.licenseNo}
          onChange={handleInputs}
          sx={{
            background: "#34353A",
            border: "0.2px solid #34353A",
            borderRadius: "8px",
            marginTop: "8px",
          }}
          placeholder="CG6AL3748"
        />
      </Box>

      {/* Model */}

      <Box sx={{ marginTop: "20px", px: 1 }}>
        <Typography
          fontFamily={"Poppins"}
          fontStyle={"Medium"}
          fontSize={"24px"}
          lineHeight={"36px"}
          color={"#FFFFFF"}
        >
          Model
        </Typography>

        <TextField
          id="margin-none"
          fullWidth
          multiline
          inputProps={{ style: { color: "#FFFFFF" } }}
          name={"carModel"}
          value={licenseForm.carModel}
          onChange={handleInputs}
          sx={{
            background: "#34353A",
            border: "0.2px solid #34353A",
            borderRadius: "8px",
            marginTop: "8px",
          }}
          placeholder="Mahindra XUV 700"
        />
      </Box>

      {/* Color */}

      <Box sx={{ marginTop: "20px", px: 1 }}>
        <Typography
          fontFamily={"Poppins"}
          fontStyle={"Medium"}
          fontSize={"24px"}
          lineHeight={"36px"}
          color={"#FFFFFF"}
        >
          Color
        </Typography>

        <TextField
          id="margin-none"
          fullWidth
          multiline
          inputProps={{ style: { color: "#FFFFFF" } }}
          name={"carColor"}
          value={licenseForm.carColor}
          onChange={handleInputs}
          sx={{
            background: "#34353A",
            border: "0.2px solid #34353A",
            borderRadius: "8px",
            marginTop: "8px",
          }}
          placeholder="Red"
        />
      </Box>

      {/* last location */}

      <Box sx={{ marginTop: "20px", px: 1 }}>
        <Typography
          fontFamily={"Poppins"}
          fontStyle={"Medium"}
          fontSize={"24px"}
          lineHeight={"36px"}
          color={"#FFFFFF"}
        >
          Last Location
        </Typography>

        <TextField
          id="margin-none"
          fullWidth
          multiline
          inputProps={{ style: { color: "#FFFFFF" } }}
          name={"lastLocation"}
          value={licenseForm.lastLocation}
          onChange={handleInputs}
          sx={{
            background: "#34353A",
            border: "0.2px solid #34353A",
            borderRadius: "8px",
            marginTop: "8px",
          }}
          placeholder="Sector 19, Indravati Bhawan, Naya Raipur"
        />
      </Box>

      {/* time of crime */}

      <Box sx={{ marginTop: "20px", px: 1 }}>
        <Typography
          fontFamily={"Poppins"}
          fontStyle={"Medium"}
          fontSize={"24px"}
          lineHeight={"36px"}
          color={"#FFFFFF"}
        >
          Date of Theft
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            name="dateandtime"
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                sx={{
                  background: "#34353A",
                  border: "0.2px solid #34353A",
                  borderRadius: "8px",
                  marginTop: "8px",
                  svg: { color },
                  input: { color },
                  icon: { color },
                }}
              />
            )}
            value={licenseForm.dateandtime}
            onChange={handleInputs}
          />
        </LocalizationProvider>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "33px",
          px: 1,
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
          onClick={formSubmitHandler}
        >
          <Typography
            fontFamily={"Poppins"}
            fontStyle={"SemiBold"}
            fontWeight={"600"}
            fontSize={"32px"}
            lineHeight={"48px"}
            color={"#FFFFFF"}
          >
            Upload
          </Typography>
        </Button>
      </Box>

      <MessageTooltip
        openTooltip={openTooltip}
        setOpenTooltip={setOpenTooltip}
        message={tooltipMsg}
      />
    </>
  );
}

export default LicenseAddFrom;
