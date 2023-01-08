import { Container, Stack } from "@mui/system";
import { useInView } from "react-intersection-observer";
import Header from "../components/Header/Header"
import { ReactNode } from "react";
import Footer from "../components/Footer/Footer";

type Props = {
  children?: ReactNode;
};

function BaseLayout({ children }: Props) {
  const { ref, inView } = useInView({ threshold: 0 });
  return (
    <Stack>
        <Header/>
        <Container maxWidth="xl">
          <Stack>{children}</Stack>
        </Container>
        <Footer />
    </Stack>
  );
}

export default BaseLayout;