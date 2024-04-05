import { Box, CssBaseline, styled } from "@mui/material";
import HivePublicNavbar from "components/HiveNavbar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const drawerWidth = 240;

const PublicLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  return (
    <OutsideContainer>
      <CssBaseline />
      <HivePublicNavbar
        isDrawerOpen={isDrawerOpen}
        drawerWidth={drawerWidth}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      <Main open={isDrawerOpen}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </OutsideContainer>
  );
};

export const OutsideContainer = styled(Box)(() => {
  return {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "#fff",
  };
});

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  // marginLeft: `-${drawerWidth}px`,
  maxWidth: "100%",
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  }),
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default PublicLayout;
