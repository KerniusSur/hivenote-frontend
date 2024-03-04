import { Box, styled } from "@mui/material";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <OutsideContainer>
      <Outlet />
    </OutsideContainer>
  );
};

const OutsideContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "100%",
});

export default PublicLayout;
