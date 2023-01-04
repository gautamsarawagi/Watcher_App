import React, { useState, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import add_image from "../../../../assets/add_image.png";
import axios from "axios";

function AddCriminalForm({handleClose}: {handleClose:any}) {
  const [file, setFile] = useState<any>(null);
  const [filePreview, setFilePreview] = useState<any>(null);

  const [criminalForm, setCriminalForm] = useState({
    criminal_name: "",
    age: "",
    image: "",
    latitude: "21.2129",
    longitude: "81.4294",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    setFile(event.target.files[0]);

    const reader = new FileReader();

    event.target.files instanceof FileList
      ? reader.readAsDataURL(event.target.files[0])
      : "handle exception";

    reader.onload = (readerEvent) => {
      if(readerEvent.target){
        setFilePreview(readerEvent.target.result);
        setCriminalForm({...criminalForm,image:readerEvent.target.result})
      }
    };
  };

  const againUpload = () => {
    setFilePreview(null);
    setFile(null);
  };

  const handleInputs = (e: { target: { name: any; value: any } }) => {
      setCriminalForm({ ...criminalForm, [e.target.name]: e.target.value });
  };

  const uploadCriminal = async () => {
    const result = await axios
      .post(`http://127.0.0.1:8000/criminal`, {
        criminal_name: criminalForm.criminal_name,
        age: criminalForm.age,
        image: criminalForm.image,
        latitude: criminalForm.latitude,
        longitude: criminalForm.longitude,
      })
      .then((res) => {
        console.log(res);
      });
    handleClose()
  };

  return (
    <>
      <Box sx={{ marginTop: "27px", px: 1 }}>
        <Typography
          fontFamily={"Poppins"}
          fontStyle={"Medium"}
          fontSize={"24px"}
          lineHeight={"36px"}
          color={"#FFFFFF"}
          fontWeight={"500"}
        >
          Name
        </Typography>

        <TextField
          id="margin-none"
          fullWidth
          multiline
          inputProps={{ style: { color: "#FFFFFF" } }}
          name={"criminal_name"}
          value={criminalForm.criminal_name}
          onChange={handleInputs}
          sx={{
            background: "#34353A",
            border: "0.2px solid #34353A",
            borderRadius: "8px",
            marginTop: "8px",
          }}
          placeholder="Dawood Ibrahim"
        />
      </Box>

      <Box sx={{ marginTop: "16px", px: 1 }}>
        <Typography
          fontFamily={"Poppins"}
          fontStyle={"Medium"}
          fontSize={"24px"}
          lineHeight={"36px"}
          color={"#FFFFFF"}
          fontWeight={"500"}
        >
          Age
        </Typography>

        <TextField
          id="margin-none"
          fullWidth
          multiline
          inputProps={{ style: { color: "#FFFFFF" } }}
          name={"age"}
          value={criminalForm.age}
          onChange={handleInputs}
          sx={{
            background: "#34353A",
            border: "0.2px solid #34353A",
            borderRadius: "8px",
            marginTop: "8px",
          }}
          placeholder="45"
        />
      </Box>
      {filePreview == null ? (
        <>
          {/* upload image */}
          <Box sx={{ marginTop: "16px", px: 1 }}>
            <Typography
              fontFamily={"Poppins"}
              fontStyle={"Medium"}
              fontSize={"24px"}
              lineHeight={"36px"}
              color={"#FFFFFF"}
              fontWeight={"500"}
            >
              Upload a Photo
            </Typography>

            <Button sx={{ p: 0 }} component="label">
              <Box
                sx={{
                  width: "462px",
                  height: "156px",
                  background: "#34353A",
                  border: "2px dashed rgba(217, 217, 217, 0.5)",
                  borderRadius: "8px",
                  marginTop: "8px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image src={add_image} alt={""} />

                <Typography
                  fontFamily={"Poppins"}
                  fontStyle={"Medium"}
                  fontSize={"16px"}
                  lineHeight={"24px"}
                  color={"#FFFFFF"}
                  fontWeight={"500"}
                  sx={{ textAlign: "center", marginTop: "8px" }}
                >
                  Drag and Drop files to upload <br /> or <br /> Select a file
                  in your Computer
                </Typography>
              </Box>
              <input type="file" onChange={handleChange} hidden />
            </Button>
          </Box>
        </>
      ) : (
        <Box sx={{ position: "relative", marginTop: "28px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {filePreview != null && (
              <>
                <Image
                  src={filePreview}
                  alt={file?.name}
                  width={150}
                  height={150}
                />
                <Typography
                  fontFamily={"Poppins"}
                  fontStyle={"Medium"}
                  fontSize={"24px"}
                  lineHeight={"36px"}
                  color={"#FFFFFF"}
                  sx={{ marginTop: "15px" }}
                >
                  {file.name}
                </Typography>
              </>
            )}
          </Box>

          <Box
            sx={{
              position: "absolute",
              top: "0",
              right: "0",
              color: "white",
              cursor: "pointer",
            }}
            onClick={againUpload}
          >
            <CloseIcon />
          </Box>
        </Box>
      )}

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
          onClick={uploadCriminal}
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
    </>
  );
}

export default AddCriminalForm;
