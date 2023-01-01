import React,{useRef} from "react";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Image from "next/image";
import logo from "../../assets/logo.png"
import Typography from "@mui/material/Typography"

import { headerLinks } from "./HeaderLinks";

function Header() {


  return (
    <>
      <AppBar  sx={{py:2,background:"#000000"}} position="static">
        <Toolbar sx={{px:2}}>
          <div style={{flexGrow:1}}>
          <Image src={logo} alt="logo"/>
          </div>
          <Box 
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            columnGap: "78px",
          }}
          >
            {headerLinks.map((item,index) => {
              return (
                <>
               <Typography
                    fontFamily={"Poppins"}
                    fontStyle={"SemiBold"}
                    fontWeight={"400"}
                    fontSize={"32px"}
                    lineHeight={"48px"}
                    color={"#FFFFFF"}
                    sx={{cursor:'pointer'}}
                    key={index}
                  >
                    {item.name}
                  </Typography>
                </>
              )
            })}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;