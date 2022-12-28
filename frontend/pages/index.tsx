import {useRef} from 'react';
import Head from "next/head";
import { Inter } from "@next/font/google";
import BaseLayout from "../layout/BaseLayout";
import HomeStyles from "../styles/Home.module.css";
import Box from "@mui/material/Box";
import Headline from "../features/main/Headline";
import HeroComponent from "../features/main/HeroComponent";
import Watcher from "../features/main/Watcher";
import Tracks from "../features/main/Tracks";
import Contact from "../features/main/Contact";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

 const scrollToRef = useRef();
  
  return (
    <>
      <Head>
        <title>Watcher App | Home </title>
        <meta name="description" content="Watcher Police help Web App" />
        <meta name="viewport" content="width=1200, minimum-scale=0.25" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className={HomeStyles.body}>
        <BaseLayout>
          <Headline scrollToRef={null}/>
          <HeroComponent scrollToRef={null}/>
          <Watcher />
          <Tracks/>
          <Contact/>
        </BaseLayout>
      </Box>
    </>
  );
}
