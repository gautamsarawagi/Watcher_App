import { Container, Stack, Box } from "@mui/system";
import { ReactNode, useState } from "react";
import NavbarDrawer from "../features/All_Models/NavbarDrawer";

type Props = {
  children?: ReactNode;
};

function CriminalDetectionLayout({ children }: Props) {
  const [data,setData] = useState()
  return (
    <>
      <Stack>
          <Box sx={{ display: "flex" }}>
            <NavbarDrawer />
            <Container maxWidth="xl">
              <Stack>{children}</Stack>
            </Container>
          </Box>
      </Stack>
    </>
  );
}

export default CriminalDetectionLayout;
