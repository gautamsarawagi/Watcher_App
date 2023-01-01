import React,{useState,useEffect} from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Image from "next/image";
import key_label from "../../../../assets/label_key.png";
import axios from "axios";
import { useRouter } from "next/router";

function TrackComplaintPlateNo() {

    const router = useRouter();
    const [licenseNo, setLicenseNo] = useState("");
    const [datafromlicense, setDatafromlicense] = useState<any[]>([])
  
    const viewdatainmap = async () => {
      const result = await axios
        .get(`http://127.0.0.1:8000/license/${licenseNo}`)
        .then((res) => {
          setDatafromlicense(res.data.data);
        });
    };

    useEffect(() => {
      if(datafromlicense?.length == 1){
        router.push(
          {
            pathname: "/vehicle/LocationMap",
            query: {
              latitude: datafromlicense[0]?.latitude,
              longitude: datafromlicense[0]?.longitude,
            },
          },
        );

      }
    }, [datafromlicense])
    

  return (
    <>
      <Typography
        fontFamily={"Inter"}
        fontStyle={"SemiBold"}
        fontSize={"40px"}
        lineHeight={"48px"}
        color={"#FFFFFF"}
        fontWeight={"600"}
        sx={{ marginTop: "-16px" }}
      >
        Welcome to Track V
      </Typography>

      <Typography
        fontFamily={"Inter"}
        fontStyle={"Regular"}
        fontSize={"20px"}
        lineHeight={"24px"}
        color={"#D9D9D9"}
        fontWeight={"400"}
        sx={{ marginTop: "8px" }}
      >
        For Using map Feature please use the following license plate : CG04B1234
      </Typography>

      <TextField
        id="margin-none"
        fullWidth
        multiline
        InputProps={{
          style: { color: "#FFFFFF" },
          startAdornment: (
            <InputAdornment position="start">
              <Image src={key_label} alt={""} />
            </InputAdornment>
          ),
        }}
        name={"licensenumber"}
        value={licenseNo}
        onChange={(e) => setLicenseNo(e.target.value)}
        sx={{
          background: "#34353A",
          border: "0.2px solid #34353A",
          borderRadius: "8px",
          marginTop: "28px",
        }}
        placeholder="Enter license plate "
      />

      <Button
        sx={{
          border: "1px solid #008DFF",
          borderRadius: "5px",
          background: "#008DFF",
          height: "48px",
          marginTop: "12px",
        }}
        fullWidth
        onClick={viewdatainmap}
      >
        <Typography
          fontFamily={"Inter"}
          fontStyle={"SemiBold"}
          fontWeight={"600"}
          fontSize={"20px"}
          lineHeight={"24px"}
          color={"#FFFFFF"}
        >
          View in Map
        </Typography>
      </Button>
    </>
  );
}

export default TrackComplaintPlateNo;