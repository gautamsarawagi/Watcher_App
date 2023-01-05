import React,{useState,useEffect} from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Image from "next/image";
import key_label from "../../../../assets/label_key.png";
import axios from "axios";
import { useRouter } from "next/router";
import MessageTooltip from "../../../MessageTooltip";

function TrackCriminalbyName() {

    const router = useRouter();
    const [criminalName, setCriminalName] = useState("");

    const [openTooltip,setOpenTooltip] = useState(false)
    const [tooltipMsg,setTooltipMsg] = useState({})

    const [criminalData,setCriminalData] = useState<any[]>([])

    const viewdatainmap = async () => {
        const result = await axios
        .get(`http://127.0.0.1:8000/criminal/${criminalName}`)
        .then((res) => {
          setTooltipMsg(res.data)
          setOpenTooltip(true)
          setCriminalData(res.data.data);
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
      if(criminalData?.length == 1){
        router.push(
          {
            pathname: "/vehicle/LocationMap",
            query: {
              latitude: criminalData[0]?.latitude,
              longitude: criminalData[0]?.longitude,
            },
          },
        );

      }
    }, [criminalData,router])
    

  return (
    <>
    <Typography
        fontFamily={"Inter"}
        fontStyle={"SemiBold"}
        fontSize={"40px"}
        lineHeight={"48px"}
        color={"#FFFFFF"}
        fontWeight={"600"}
        sx={{ marginTop: "16px" }}
      >
        Welcome to Track C
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
        For Using map Feature please use the following Criminal Name : ABCD
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
        name={"criminal_name"}
        value={criminalName}
        onChange={(e) => setCriminalName(e.target.value)}
        sx={{
          background: "#34353A",
          border: "0.2px solid #34353A",
          borderRadius: "8px",
          marginTop: "28px",
        }}
        placeholder="Enter Criminal Name "
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

      <MessageTooltip openTooltip = {openTooltip} setOpenTooltip={setOpenTooltip} message={tooltipMsg}/>
    </>
  )
}

export default TrackCriminalbyName