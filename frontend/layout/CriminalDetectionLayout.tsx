import { Container, Stack, Box } from "@mui/system";
import { useInView } from "react-intersection-observer";
import { BrandInViewContext } from "../contexts/HeaderContext";
import { ReactNode } from "react";
import NavbarDrawer from "../features/All_Models/NavbarDrawer";
import { useState } from "react";

type Props = {
  children?: ReactNode;
};

function CriminalDetectionLayout({ children }: Props) {
  const { ref, inView } = useInView({ threshold: 0 });
  const [activeTab, setActiveTab] = useState("");
  
  return (
    <>
      <Stack>
        <BrandInViewContext.Provider value={{ inView }}>
          <Box sx={{ display: "flex" }}>
            <NavbarDrawer />
            <Container maxWidth="xl">
              <Stack>{children}</Stack>
            </Container>
          </Box>
        </BrandInViewContext.Provider>
      </Stack>
    </>
  );
}

export default CriminalDetectionLayout;
