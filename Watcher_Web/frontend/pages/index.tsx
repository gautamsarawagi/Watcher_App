import { useRef, useState } from "react";
import Head from "next/head";
import { Inter } from "@next/font/google";
import BaseLayout from "../layout/BaseLayout";
import HomeStyles from "../styles/Home.module.css";
import Box from "@mui/material/Box";
import Headline from "../features/Main/Headline";
import HeroComponent from "../features/Main/HeroComponent";
import Watcher from "../features/Main/Watcher";
import Tracks from "../features/Main/Tracks";
import Contact from "../features/Main/Contact";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Watcher App | Home </title>
        <meta name="description" content="Watcher Police help Web App" />
        <meta name="viewport" content="width=1200, minimum-scale=0.25" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <Box className={HomeStyles.body}>
        <BaseLayout>
          <Headline />
          <HeroComponent />
          <div id="AboutUs">
            <Watcher />
          </div>
          <div id="Products">
            <Tracks />
          </div>
          <div id="ContactUs">
            <Contact />
          </div>
        </BaseLayout>
      </Box>
    </>
  );
}
