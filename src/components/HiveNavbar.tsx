import { MenuOutlined } from "@mui/icons-material";
import { Box, Divider, IconButton, styled, Toolbar } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { Auth } from "api/Auth";
import { NoteCreateRequest, NoteResponse } from "api/data-contracts";
import { Notes } from "api/Notes";
import HiveNoteTextLogo from "assets/hivenote-text-logo.svg";
import HiveButton from "components/HiveButton";
import HiveDrawer from "components/HiveDrawer";
import HiveLoadingSpinner from "components/HiveLoadingSpinner";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createApi } from "utils/ApiCreator";
import useAuthStore from "utils/AuthStore";
import useNoteStore from "utils/NoteStore";

interface HiveNavbarProps {
  isDrawerOpen: boolean;
  drawerWidth: number;
  setIsDrawerOpen: (isDrawerOpen: boolean) => void;
}

const HivePublicNavbar = (props: HiveNavbarProps) => {
  const { isDrawerOpen, drawerWidth, setIsDrawerOpen } = props;
  const navigate = useNavigate();
  const { account, isStateReady } = useAuthStore();
  const { activeNoteId, setActiveNoteId, hasUpdates, setHasUpdates } =
    useNoteStore();
  const authAPI = useRef(createApi("auth") as Auth);
  const noteAPI = useRef(createApi("note") as Notes);
  const [ownerNotes, setOwnerNotes] = useState<NoteResponse[]>([]);
  const [sharedNotes, setSharedNotes] = useState<NoteResponse[]>([]);

  useEffect(() => {
    if (isStateReady && account) {
      getAllUserNotes();
    }
  }, [isStateReady, account]);

  useEffect(() => {
    if (hasUpdates) {
      getAllUserNotes();
      setHasUpdates(false);
    }
  }, [hasUpdates, setHasUpdates]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const logout = async () => {
    await authAPI.current.logout();
    window.location.href = "/";
    toast.success("Logged out successfully");
  };

  const handleCreateNote = async (parentId?: string) => {
    const noteCreateRequest: NoteCreateRequest = {
      title: "Untitled",
      parentId,
    };

    const response = await noteAPI.current.create(noteCreateRequest);
    // if (!parentId) {
    // toggleDrawer();
    // }
    toast.success("Note created successfully");
    setActiveNoteId(response.id);
    navigate(`/note/${response.id}`);
    // window.location.href = `/note/${response.id}`;
    getAllUserNotes();
  };

  const getAllUserNotes = async () => {
    const ownerNotes = await noteAPI.current.findAllRootNotesWithOwnerAccess();
    setOwnerNotes(ownerNotes);

    const sharedNotes =
      await noteAPI.current.findAllRootNotesWithSharedAccess();
    setSharedNotes(sharedNotes);
  };

  const handleSelectNote = (noteId: string) => {
    setActiveNoteId(noteId);
    navigate(`/note/${noteId}`);

    //TODO: decide whether to close the drawer after selecting a note
    // toggleDrawer();
  };

  const handleDeleteNote = async (noteId: string) => {
    await noteAPI.current.delete(noteId);
    if (noteId === activeNoteId) {
      setActiveNoteId(undefined);
      navigate("/");
    }
    toast.success("Note deleted successfully");
    getAllUserNotes();

    // toggleDrawer();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <HiveDrawer
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        drawerWidth={drawerWidth}
        ownerNotes={ownerNotes}
        sharedNotes={sharedNotes}
        handleCreateNote={handleCreateNote}
        handleSelectNote={handleSelectNote}
        handleDeleteNote={handleDeleteNote}
      />
      <AppBar position="fixed" open={isDrawerOpen}>
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              boxSizing: "border-box",
              padding: "16px 32px",
            }}
          >
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
                  }}
                >
                  <img
                    style={{
                      height: "18px",
                    }}
                    src={HiveNoteTextLogo as any}
                    alt="HiveNote"
                    onClick={() => {
                      navigate("/");
                    }}
                  />
                </Box>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "24px",
                width: "100%",
              }}
            >
              {isStateReady && account && (
                <IconButton
                  sx={{
                    display: "flex",
                    color: "#0E0E0E",
                  }}
                  onClick={toggleDrawer}
                >
                  <MenuOutlined />
                </IconButton>
              )}
              {isStateReady && !account && (
                <img
                  style={{
                    height: "18px",
                  }}
                  src={HiveNoteTextLogo as any}
                  alt="HiveNote"
                />
              )}
              <>
                {!isStateReady && <HiveLoadingSpinner size="small" />}
                {isStateReady && !account && (
                  <Box
                    sx={{
                      display: "flex",
                      gap: "16px",
                    }}
                  >
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
                  </Box>
                )}
                {isStateReady && account && (
                  <HiveButton
                    text="Logout"
                    variant="outlined"
                    compact
                    onClick={logout}
                  />
                )}
              </>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Divider
        sx={{
          width: "calc(100% + 160px)",
          marginLeft: "-160px",
          borderColor: "#0E0E0E",
        }}
      />
    </Box>
  );
};

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
export default HivePublicNavbar;
