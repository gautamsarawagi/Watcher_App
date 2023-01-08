import CssBaseline from "@mui/material/CssBaseline";
import { Container, Stack, Box } from "@mui/system";
import { ReactNode, SetStateAction, useState } from "react";
import NavbarDrawer from "../features/All_Models/NavbarDrawer";

type Props = {
  children?: ReactNode;
};

function ModelLayout({ children }: Props) {

  return (
    <>
      <Stack>
        <Box sx={{ display: "flex" }}>
        <CssBaseline />
          <NavbarDrawer/>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 0,
              width: { sm: `calc(100% - 200px)` },
              height:'100%'
            }}
          >
            {children}
          </Box>
        </Box>
      </Stack>
    </>
  );
}

export default ModelLayout;
