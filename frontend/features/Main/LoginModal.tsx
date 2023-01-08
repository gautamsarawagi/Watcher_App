import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import watcher from "../../assets/watcher.png";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import axios from "axios";
import MessageTooltip from "../MessageTooltip";
import { useRouter } from "next/router";

function LoginModal() {

  const router = useRouter()
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [openTooltip, setOpenTooltip] = useState(false);
  const [tooltipMsg, setTooltipMsg] = useState({});
  const [routingStatus,setRoutingStatus] = useState("")

  const handleInputs = (e: { target: { name: any; value: any } }) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const loginHandler = () => {
    axios.post("http://127.0.0.1:8000/login", loginForm).then((res) => {
      setTooltipMsg(res.data);
      setOpenTooltip(true);
      setRoutingStatus(res.data.Status)
    });
  };

  useEffect(() => {
    if(routingStatus == "success"){
      router.push("/vehicle")
    }
  }, [router, routingStatus])
  

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image src={watcher} alt={""} height={75} width={75} />
        <Typography
          fontFamily={"Poppins"}
          fontStyle={"normal"}
          fontWeight={"600"}
          fontSize={"24px"}
          lineHeight={"32px"}
          color={"#D9D9D9"}
          sx={{ marginTop: "15px" }}
        >
          Sign in to Continue
        </Typography>
      </Box>

      <TextField
        id="margin-none"
        fullWidth
        multiline
        InputProps={{
          style: { color: "#FFFFFF" },
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
        name={"email"}
        value={loginForm.email}
        onChange={handleInputs}
        sx={{
          background: "#34353A",
          border: "0.2px solid #34353A",
          borderRadius: "8px",
          marginTop: "28px",
        }}
        placeholder="Enter your Police Personnel Id  "
      />

      <TextField
        id="margin-none"
        fullWidth
        multiline
        InputProps={{
          style: { color: "#FFFFFF" },
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
          type: "password",
        }}
        name={"password"}
        value={loginForm.password}
        onChange={handleInputs}
        sx={{
          background: "#34353A",
          border: "0.2px solid #34353A",
          borderRadius: "8px",
          marginTop: "28px",
        }}
        placeholder="Password"
      />

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          sx={{
            border: "1px solid #008DFF",
            borderRadius: "5px",
            background: "#008DFF",
            height: "48px",
            width: "300px",
            marginTop: "24px",
          }}
          onClick={loginHandler}
        >
          <Typography
            fontFamily={"Poppins"}
            fontStyle={"SemiBold"}
            fontWeight={"600"}
            fontSize={"20px"}
            lineHeight={"24px"}
            color={"#FFFFFF"}
          >
            Login
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

export default LoginModal;
