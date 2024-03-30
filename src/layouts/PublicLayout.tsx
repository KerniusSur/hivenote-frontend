import { Box, styled, useMediaQuery } from "@mui/material";
import HivePublicNavbar from "components/HiveNavbar";
import { Outlet } from "react-router-dom";
import useAuthStore from "utils/AuthStore";

const PublicLayout = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <OutsideContainer>
      <HivePublicNavbar />
      <Outlet />
    </OutsideContainer>
  );
};

export const OutsideContainer = styled(Box)(() => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { account, isStateReady } = useAuthStore();
  return {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    paddingLeft: isMobile || !account || !isStateReady ? "0px" : "200px",
  };
});

export default PublicLayout;
