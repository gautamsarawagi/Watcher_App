import React, { ChangeEvent, useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Image from "next/image";

function CriminalPopover({
  anchorEl,
  setAnchorEl,
  id,
}: {
  anchorEl: any;
  setAnchorEl: any;
  id: any;
}) {
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const [file, setFile] = useState<any>(null);
  const [filePreview, setFilePreview] = useState(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

    if (!event.target.files) return;

    setFile(event.target.files[0]);

    const reader = new FileReader();

    event.target.files instanceof FileList ? reader.readAsDataURL(event.target.files[0]) : 'handle exception'

    reader.onload = (readerEvent) => {
      setFilePreview(readerEvent.target.result);
    };
  };

  const uploadImage = () => {};

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorReference="anchorPosition"
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        anchorPosition={{
          top: 0,
          left: 66,
        }}
      >
        <Box sx={{ background: "#202126" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              columnGap: "13px",
              px: 3,
              paddingTop: "19px",
              color: "white",
            }}
          >
            <KeyboardBackspaceIcon
              sx={{ cursor: "pointer" }}
              onClick={handleClose}
            />
            <Typography
              fontFamily={"Poppins"}
              fontStyle={"Regular"}
              fontSize={"24px"}
              lineHeight={"36px"}
              color={"#FFFFFF"}
            >
              Back
            </Typography>
          </Box>

          <Box
            sx={{
              background: "#34353A",
              width: "100%",
              height: "80px",
              display: "flex",
              alignItems: "center",
              px: 3,
              marginTop: "11px",
            }}
          >
            <Typography
              fontFamily={"Poppins"}
              fontStyle={"SemiBold"}
              fontSize={"32px"}
              lineHeight={"48px"}
              color={"#FFFFFF"}
            >
              Track Criminal
            </Typography>
          </Box>

          {/* Upload the image */}

          <Box sx={{ marginTop: "45px", px: 3 }}>
            <Typography
              fontFamily={"Poppins"}
              fontStyle={"Medium"}
              fontSize={"24px"}
              lineHeight={"36px"}
              color={"#FFFFFF"}
            >
              Upload the Image here
            </Typography>

            <Button
              component="label"
              sx={{
                border: "1px solid #008DFF",
                borderRadius: "10px",
                background: "#008DFF",
                width: "462px",
                height: "32px",
                marginTop: "16px",
              }}
            >
              Upload File
              <input type="file" onChange={handleChange} hidden />
            </Button>
          </Box>

          <Typography
            fontFamily={"Poppins"}
            fontStyle={"Medium"}
            fontSize={"24px"}
            lineHeight={"36px"}
            color={"#FFFFFF"}
            sx={{ px: 3, marginTop: "15px" }}
          >
            File Uploaded : {file ? file.name : "No file choosen"}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "33px",
              px: 3,
              pb: 3,
            }}
          >
            {filePreview != null && (
              <Image
                src={filePreview}
                alt={file?.name}
                width={100}
                height={100}
              />
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "33px",
              px: 3,
              pb: 3,
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
            >
              <Typography
                fontFamily={"Poppins"}
                fontStyle={"SemiBold"}
                fontWeight={"600"}
                fontSize={"32px"}
                lineHeight={"48px"}
                color={"#FFFFFF"}
                onClick={uploadImage}
              >
                Track
              </Typography>
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
}

export default CriminalPopover;
