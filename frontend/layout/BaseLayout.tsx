import { Container, Stack } from "@mui/system";
import { useInView } from "react-intersection-observer";
import Header from "../components/Header/Header"
import { BrandInViewContext } from "../contexts/HeaderContext";
import { ReactNode } from "react";
import Footer from "../components/Footer/Footer";

type Props = {
  children?: ReactNode;
};

function BaseLayout({ children }: Props) {
  const { ref, inView } = useInView({ threshold: 0 });
  return (
    <Stack>
      <BrandInViewContext.Provider value={{ inView }}>
        <Header/>
        <Container maxWidth="xl">
          <Stack>{children}</Stack>
        </Container>
        <Footer />
      </BrandInViewContext.Provider>
    </Stack>
  );
}

export default BaseLayout;