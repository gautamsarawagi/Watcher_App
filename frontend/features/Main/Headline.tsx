import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import Modal from '@mui/material/Modal';
import LoginModal from "./LoginModal";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: '#202126',
  border: '2px solid #202126',
  borderRadius:"25px",
  boxShadow: 24,
  p: 4,
};

type Props = {};

function Headline({}: Props) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  

  return (
    <>
      <Typography
        fontFamily={"Poppins"}
        fontStyle={"normal"}
        fontWeight={"700"}
        fontSize={"96px"}
        lineHeight={"144px"}
        color={"#FFFFFF"}
        sx={{ marginTop: "108px", display: "flex", justifyContent: "center" }}
      >
        Advance. <span style={{ color: "#008DFF" }}>Secure</span> Network.
      </Typography>

      <Typography
        fontFamily={"Poppins"}
        fontStyle={"normal"}
        fontWeight={"500"}
        fontSize={"24px"}
        lineHeight={"36px"}
        color={"#FFFFFF"}
        sx={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
        Unleashing the power of artificial intelligence to protect you and your
        assets
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center",marginTop:'29px' }}>
        <Button sx={{width:'280px',height:"64px",border:'1px solid #008DFF',borderRadius:'10px',background:'#008DFF'}} onClick={handleOpen}>
        <Typography
        fontFamily={"Poppins"}
        fontStyle={"normal"}
        fontWeight={"600"}
        fontSize={"32px"}
        lineHeight={"48px"}
        color={"#FFFFFF"}
      >
       Login
      </Typography>
        </Button>
        
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <LoginModal/>
        </Box>
      </Modal>
    </>
  );
}

export default Headline;