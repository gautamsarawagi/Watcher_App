import React, { useState, MouseEvent, useEffect } from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Image, { StaticImageData } from "next/image";
import Box from "@mui/material/Box";
import { drawer_links } from "./drawerlinks";
import watcher from "../../assets/drawer_icon.png";
import LicensePopoverTabs from "./popovers/license/LicensePopover";
import CriminalPopover from "./popovers/criminal/CriminalPopover";
import TheftsPopover from "./popovers/thefts/TheftsPopover";

import { useRouter } from "next/router";

const drawerWidth = 250;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  background: "#34353A",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  background: "#34353A",
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  // background:"#34353A",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// --------------------------------------------NavbarDrawer function starts here------------------------------------------------------------------------------

function NavbarDrawer() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Vehicle_testing");

  const handleDrawer = () => {
    setOpen(!open);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const id_popover = open ? "simple-popover" : undefined;

  const handlePopover = ({ target }: MouseEvent): void => {
    setAnchorEl(target);
  };

  const handleModels = (data: {
    path: URL;
    name: any;
    image?: StaticImageData;
  }) => {
    setActiveTab(data.name);
    router.push({
      pathname: `${data.path}`,
      query: { activeTab: data.name },
    });
  };

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus("");
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  }, []);

  return (
    <>
      <Drawer variant="permanent" open={open}>
        <List sx={{ marginTop: "15px" }}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              aria-label="open drawer"
              onClick={handleDrawer}
              sx={{
                minHeight: 48,
                justifyContent: "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <Image src={watcher} alt="watcher" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          {drawer_links.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: "block", marginTop: "36px" }}
              onClick={() => handleModels(item)}
              aria-describedby={id_popover}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={handlePopover}
              >
                <Box
                  sx={{
                    background: activeTab == item.name ? "#202126" : null,
                    p: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: activeTab == item.name ? "1px solid #202126" : null,
                    borderRadius: "5px",
                    mr: open ? 3 : "auto",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: "center",
                    }}
                  >
                    <Image src={item.image} alt={`${item.name}`} />
                  </ListItemIcon>
                </Box>

                <ListItemText
                  primary={
                    <Typography
                      fontFamily={"Poppins"}
                      fontStyle={"Regular"}
                      fontSize={"24px"}
                      lineHeight={"36px"}
                      color={"#FFFFFF"}
                    >
                      {item.name}
                    </Typography>
                  }
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box>
        {activeTab == "Track Vehicles" ? (
          <LicensePopoverTabs
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            id={id_popover}
            lat={lat} 
            lng={lng}
          />
        ) : activeTab == "Track Criminal" ? (
          <CriminalPopover
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            id={id_popover}
            lat={lat} 
            lng={lng}
          />
        ) : activeTab == "Track Thefts" ? (
          <TheftsPopover
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            id={id_popover}
          />
        ) : null}
      </Box>
    </>
  );
}

export default NavbarDrawer;
