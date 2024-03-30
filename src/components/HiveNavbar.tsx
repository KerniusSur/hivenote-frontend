import { Box, Button, Drawer, Typography, useMediaQuery } from "@mui/material";
import HiveButton from "components/HiveButton";
import HiveNoteTextLogo from "assets/hivenote-text-logo.svg";
import { useNavigate } from "react-router-dom";
import useAuthStore from "utils/AuthStore";
import HiveLoadingSpinner from "components/HiveLoadingSpinner";
import { useRef, useState } from "react";
import { Auth } from "api/Auth";
import { createApi } from "utils/ApiCreator";
import { AddToPhotosRounded } from "@mui/icons-material";

interface HiveNavbarProps {}

const HivePublicNavbar = (props: HiveNavbarProps) => {
  const navigate = useNavigate();
  const { account, isStateReady } = useAuthStore();
  const authAPI = useRef(createApi("auth") as Auth);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const isMobile = useMediaQuery("(max-width: 600px)");

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const logout = async () => {
    await authAPI.current.logout();
    window.location.reload();
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        boxSizing: "border-box",
        padding: "16px 32px",
        borderBottom: "1px solid #0E0E0E",
      }}
    >
      {account && isStateReady && (
        <Drawer
          anchor="left"
          open={isDrawerOpen || !isMobile}
          variant="permanent"
          onClose={toggleDrawer}
          PaperProps={{
            sx: {
              width: "200px",
              zIndex: 0,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
              padding: "24px 0px",
              height: "24px",
              borderBottom: "1px solid #0E0E0E",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              style={{
                height: "18px",
              }}
              src={HiveNoteTextLogo as any}
              alt="HiveNote"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              padding: "24px 0px",
            }}
          >
            <DrawerContent />
          </Box>
        </Drawer>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
        }}
      >
        {!account && !isStateReady && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              style={{
                height: "18px",
              }}
              src={HiveNoteTextLogo as any}
              alt="HiveNote"
            />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
        }}
      >
        {!isStateReady && <HiveLoadingSpinner size="small" />}
        {isStateReady && !account && (
          <>
            <HiveButton
              text="Login"
              variant="outlined"
              compact
              onClick={() => navigate("/login")}
            />
            <HiveButton
              text="Register"
              variant="contained"
              compact
              onClick={() => navigate("/register")}
            />
          </>
        )}
        {isStateReady && account && (
          <HiveButton
            text="Logout"
            variant="outlined"
            compact
            onClick={logout}
          />
        )}
      </Box>
    </Box>
  );
};

const DrawerContent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        padding: "24px 0px",
      }}
    >
      <Box
        component={Button}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <AddToPhotosRounded />
        <Typography variant="body2">Add new note</Typography>
      </Box>
    </Box>
  );
};

export default HivePublicNavbar;
