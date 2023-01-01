import { Container, Stack ,Box} from "@mui/system";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";
import NavbarDrawer from "../features/All_Models/NavbarDrawer"

type Props = {
  children?: ReactNode;
};

function VehicleTestingLayout({ children }: Props) {
  const { ref, inView } = useInView({ threshold: 0 });

  return (
    <Stack>
      <Box sx={{ display: 'flex' }}>

        <NavbarDrawer/>
        <Container maxWidth="xl">
          <Stack>{children}</Stack>
        </Container>
      </Box>
    </Stack>
  )
}

export default VehicleTestingLayout