import { MenuOutlined, SearchRounded } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  styled,
  Switch,
  Toolbar,
  useTheme,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { Auth } from "api/Auth";
import { NoteCreateRequest, NoteResponse } from "api/data-contracts";
import { Notes } from "api/Notes";
import HiveNoteTextLogoWhite from "assets/hivenote-text-logo-white.svg";
import HiveNoteTextLogo from "assets/hivenote-text-logo.svg";
import HiveButton from "components/HiveButton";
import HiveDrawer from "components/HiveDrawer";
import HiveLoadingSpinner from "components/HiveLoadingSpinner";
import { HiveSearchValues } from "components/search/HiveSearch";
import HiveSearch from "components/search/HiveSearchDialog";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createApi } from "utils/api/ApiCreator";
import useAuthStore from "utils/stores/AuthStore";
import useNoteStore from "utils/stores/NoteStore";
import useSocketStore from "utils/stores/SocketStore";
import { ThemeContext } from "utils/theme/ThemeContextProvider";

interface HiveNavbarProps {
  isDrawerOpen: boolean;
  drawerWidth: number;
  setIsDrawerOpen: (isDrawerOpen: boolean) => void;
}

const HivePublicNavbar = (props: HiveNavbarProps) => {
  const { isDrawerOpen, drawerWidth, setIsDrawerOpen } = props;
  const { account, isStateReady } = useAuthStore();
  const { note } = useSocketStore();
  const { activeNoteId, setActiveNoteId, hasUpdates, setHasUpdates } =
    useNoteStore();
  const { noteId } = useParams();

  const navigate = useNavigate();
  const theme = useTheme();

  const authAPI = useRef(createApi("auth") as Auth);
  const noteAPI = useRef(createApi("note") as Notes);

  const [ownerNotes, setOwnerNotes] = useState<NoteResponse[]>([]);
  const [sharedNotes, setSharedNotes] = useState<NoteResponse[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [resultItems, setResultItems] = useState<NoteResponse[]>([]);

  useEffect(() => {
    if (isStateReady && account) {
      getAllUserNotes();
    }
  }, [isStateReady, account]);

  useEffect(() => {
    if (noteId) {
      setActiveNoteId(noteId);
    }
  }, [window.location.pathname, noteId]);

  useEffect(() => {
    if (hasUpdates) {
      getAllUserNotes();
      setHasUpdates(false);
    }
  }, [hasUpdates, setHasUpdates]);

  useEffect(() => {
    getAllUserNotes();
  }, [note, noteId]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleSearchOpen = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
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
    toast.success("Note created successfully");
    setActiveNoteId(response.id);
    navigate(`/note/${response.id}`);
    getAllUserNotes();
  };

  const getAllUserNotes = async () => {
    if (!account) return;
    const ownerNotes = await noteAPI.current.findAllRootNotesWithOwnerAccess();
    setOwnerNotes(ownerNotes);

    const sharedNotes =
      await noteAPI.current.findAllRootNotesWithSharedAccess();
    setSharedNotes(sharedNotes);
  };

  const handleSelectNote = (noteId: string) => {
    setActiveNoteId(noteId);
    navigate(`/note/${noteId}`);
  };

  const handleDeleteNote = async (noteId: string) => {
    await noteAPI.current.delete(noteId);
    if (noteId === activeNoteId) {
      setActiveNoteId(undefined);
      navigate("/");
    }
    toast.success("Note deleted successfully");
    getAllUserNotes();
  };

  const handleSearch = async (values: HiveSearchValues) => {
    const params = {
      searchString: values.searchString,
    };

    const response = await noteAPI.current.findAllFilteredBy(params);
    setResultItems(response);
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
                    src={
                      (theme.palette.mode === "light"
                        ? HiveNoteTextLogo
                        : HiveNoteTextLogoWhite) as any
                    }
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
                  }}
                  onClick={toggleDrawer}
                >
                  <MenuOutlined
                    sx={{
                      color: theme.palette.primary.main,
                      display: isDrawerOpen ? "none" : "block",
                    }}
                  />
                </IconButton>
              )}
              {isStateReady && !account && (
                <img
                  style={{
                    height: "18px",
                  }}
                  src={
                    (theme.palette.mode === "light"
                      ? HiveNoteTextLogo
                      : HiveNoteTextLogoWhite) as any
                  }
                  alt="HiveNote"
                />
              )}
              <>
                {!isStateReady && (
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "flex-end",
                    }}
                  >
                    <HiveLoadingSpinner size="small" />
                  </Box>
                )}
                {isStateReady && !account && (
                  <Box
                    sx={{
                      display: "flex",
                      gap: "16px",
                    }}
                  >
                    <ThemeSwitch />
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
                  <Box
                    sx={{
                      display: "flex",
                      gap: "16px",
                    }}
                  >
                    <IconButton
                      sx={{
                        display: "flex",
                      }}
                      onClick={handleSearchOpen}
                    >
                      <SearchRounded
                        sx={{
                          color: theme.palette.primary.main,
                        }}
                      />
                    </IconButton>
                    <ThemeSwitch />
                    <HiveButton
                      text="Logout"
                      variant="outlined"
                      compact
                      onClick={logout}
                    />
                  </Box>
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
      <HiveSearch
        open={isSearchOpen}
        resultItems={resultItems}
        handleSearch={handleSearch}
        handleClose={handleSearchClose}
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

export const ThemeSwitch = () => {
  const theme = useTheme();
  const { switchColorMode } = useContext(ThemeContext);

  return (
    <Switch
      checked={theme.palette.mode === "dark"}
      onChange={() => switchColorMode()}
    />
  );
};
export default HivePublicNavbar;
