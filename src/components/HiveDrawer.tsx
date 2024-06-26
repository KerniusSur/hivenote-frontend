import {
  AddRounded,
  AddToPhotosRounded,
  CalendarTodayOutlined,
  CloseRounded,
  KeyboardArrowDownRounded,
  KeyboardArrowRightRounded,
  MoreHorizRounded,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  ListItem,
  Menu,
  MenuItem,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import { NoteResponse, NoteShareRequest } from "api/data-contracts";
import { Notes } from "api/Notes";
import HiveNoteTextLogoWhite from "assets/hivenote-text-logo-white.svg";
import HiveNoteTextLogo from "assets/hivenote-text-logo.svg";
import ShareNoteDialog from "components/note/ShareNoteDialog";
import { ShareNoteFormValues } from "components/note/ShareNoteForm";
import { DrawerHeader } from "layouts/PublicLayout";
import NoteAccessType from "models/note/NoteAccessType";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createApi } from "utils/api/ApiCreator";
import { hexToRgba } from "utils/ObjectUtils";
import useAuthStore from "utils/stores/AuthStore";
import useNoteStore from "utils/stores/NoteStore";

interface HiveDrawerProps {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  drawerWidth: number;
  ownerNotes: NoteResponse[];
  sharedNotes: NoteResponse[];
  handleCreateNote: (parentId?: string) => void;
  handleSelectNote: (noteId: string) => void;
  handleDeleteNote: (noteId: string) => void;
}

const HiveDrawer = (props: HiveDrawerProps) => {
  const {
    isDrawerOpen,
    toggleDrawer,
    drawerWidth,
    ownerNotes,
    sharedNotes,
    handleCreateNote,
    handleSelectNote,
    handleDeleteNote,
  } = props;
  const { activeNoteId } = useNoteStore();
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Drawer
      anchor="left"
      open={isDrawerOpen}
      variant="persistent"
      onClose={toggleDrawer}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
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
        }}
      >
        <DrawerHeader
          sx={{
            paddingTop: "16px",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <img
            style={{
              height: "18px",
              marginLeft: "24px",
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
          <IconButton onClick={toggleDrawer} color="primary">
            <CloseRounded />
          </IconButton>
        </DrawerHeader>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          padding: "24px 0px",
        }}
      >
        <DrawerContent
          ownerNotes={ownerNotes}
          sharedNotes={sharedNotes}
          handleCreateNote={handleCreateNote}
          handleSelectNote={handleSelectNote}
          handleDeleteNote={handleDeleteNote}
          activeNoteId={activeNoteId}
        />
      </Box>
    </Drawer>
  );
};

interface DrawerContentProps {
  ownerNotes: NoteResponse[];
  sharedNotes: NoteResponse[];
  handleCreateNote: (parentId?: string) => void;
  handleSelectNote: (noteId: string) => void;
  handleDeleteNote: (noteId: string) => void;
  activeNoteId?: string | undefined;
}

const DrawerContent = (props: DrawerContentProps) => {
  const {
    ownerNotes,
    sharedNotes,
    activeNoteId,
    handleSelectNote,
    handleCreateNote,
    handleDeleteNote,
  } = props;
  const navigate = useNavigate();
  const noteAPI = useRef(createApi("note") as Notes);

  const [isShareDialogOpen, setIsShareDialogOpen] = useState<{
    open: boolean;
    noteId?: string;
  }>({
    open: false,
    noteId: undefined,
  });
  const [menuState, setMenuState] = useState<{
    open: boolean;
    anchorEl: HTMLElement | null;
    noteId?: string;
  }>({
    open: false,
    anchorEl: null,
    noteId: undefined,
  });

  const handleOpenShareDialog = (noteId: string) => {
    setIsShareDialogOpen({ open: true, noteId: noteId });
  };

  const handleCloseShareDialog = () => {
    setIsShareDialogOpen({ open: false, noteId: undefined });
  };

  const handleShareNote = async (values: ShareNoteFormValues) => {
    console.log("noteDIIDIDIDIDIID" + isShareDialogOpen.noteId);
    if (!isShareDialogOpen.noteId) {
      return;
    }

    const request: NoteShareRequest = {
      noteId: isShareDialogOpen.noteId,
      accessType: values.accessType,
      emails: [values.email],
    };

    await noteAPI.current.shareNote(request);
    handleCloseShareDialog();
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    noteId?: string
  ) => {
    setMenuState({
      open: true,
      anchorEl: event.currentTarget,
      noteId: noteId,
    });
  };

  const handleMenuClose = () => {
    setMenuState({
      open: false,
      anchorEl: null,
      noteId: undefined,
    });
  };

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
        onClick={() => handleCreateNote()}
        sx={{
          borderRadius: "0px",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-start",
            gap: "8px",
          }}
        >
          <AddToPhotosRounded />
          <Typography variant="title2">Add new note</Typography>
        </Box>
      </Box>
      <Box
        component={Button}
        onClick={() => navigate("/calendar")}
        sx={{
          borderRadius: "0px",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-start",
            gap: "8px",
          }}
        >
          <CalendarTodayOutlined />
          <Typography variant="title2">Calendar</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "36px",
          padding: "24px 0px",
        }}
      >
        {ownerNotes?.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                padding: "0px 8px !important",
              }}
            >
              Your Notes
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <RecursiveNoteList
                notes={ownerNotes}
                handleSelectNote={handleSelectNote}
                handleCreateNote={handleCreateNote}
                handleMenuOpen={handleMenuOpen}
                handleOpenShareDialog={handleOpenShareDialog}
              />
            </Box>
          </Box>
        )}
        {sharedNotes?.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                padding: "0px 8px !important",
              }}
            >
              Shared Notes
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <RecursiveNoteList
                notes={sharedNotes}
                handleSelectNote={handleSelectNote}
                handleCreateNote={handleCreateNote}
                handleMenuOpen={handleMenuOpen}
                handleOpenShareDialog={handleOpenShareDialog}
              />
            </Box>
          </Box>
        )}
      </Box>
      <Menu
        anchorEl={menuState.anchorEl}
        open={menuState.open}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {menuState.noteId && (
          <MenuItem
            onClick={() => {
              if (menuState.noteId) {
                handleDeleteNote(menuState.noteId);
              }

              if (menuState.noteId === activeNoteId) {
                window.location.href = "/";
              }

              handleMenuClose();
            }}
          >
            <Typography variant="body2">Delete</Typography>
          </MenuItem>
        )}
        <MenuItem onClick={handleMenuClose}>
          <Typography variant="body2">Rename</Typography>
        </MenuItem>
      </Menu>

      {isShareDialogOpen.noteId && (
        <ShareNoteDialog
          open={isShareDialogOpen.open}
          dialogTitle="Share Note"
          handleSubmit={handleShareNote}
          handleClose={handleCloseShareDialog}
        />
      )}
    </Box>
  );
};

interface ExpandNoteIconProps {
  note: NoteResponse;
  isExpanded: boolean;
  handleExpandNote: (noteId: string) => void;
}

export const ExpandNoteIcon = (props: ExpandNoteIconProps) => {
  const { note, isExpanded, handleExpandNote } = props;
  return (
    <IconButton
      sx={{
        padding: "2px",
      }}
      onClick={() => handleExpandNote(note.id)}
    >
      {isExpanded ? (
        <KeyboardArrowDownRounded
          sx={{
            color: "text.primary",
            width: "20px",
            height: "20px",
          }}
        />
      ) : (
        <KeyboardArrowRightRounded
          sx={{
            color: "text.primary",
            width: "20px",
            height: "20px",
          }}
        />
      )}
    </IconButton>
  );
};

export const NoteOptions = ({
  noteId,
  handleCreateNote,
  handleMenuOpen,
  depth,
  isEditor,
  handleOpenShareDialog,
}: {
  noteId?: string;
  handleCreateNote: (parentId?: string) => void;
  handleMenuOpen: (
    event: React.MouseEvent<HTMLElement>,
    noteId?: string
  ) => void;
  depth?: number;
  isEditor: boolean;
  handleOpenShareDialog: (noteId: string) => void;
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        gap: "4px",
        paddingRight: "8px",
      }}
    >
      <IconButton
        sx={{
          padding: "4px",
        }}
        onClick={(e) => {
          handleMenuOpen(e, noteId);
        }}
      >
        <MoreHorizRounded
          sx={{
            color: theme.palette.text.primary,
            width: "16px",
            height: "16px",
          }}
        />
      </IconButton>
      {isEditor && noteId && (
        <IconButton
          sx={{
            padding: "4px",
          }}
          onClick={(e) => {
            handleOpenShareDialog(noteId);
          }}
        >
          <ShareOutlined
            sx={{
              color: theme.palette.text.primary,
              width: "16px",
              height: "16px",
            }}
          />
        </IconButton>
      )}
      {(!depth || depth < 2) && (
        <IconButton
          sx={{
            padding: "4px",
          }}
          onClick={(e) => {
            handleCreateNote(noteId);
          }}
        >
          <AddRounded
            sx={{
              color: theme.palette.text.primary,
              width: "16px",
              height: "16px",
            }}
          />
        </IconButton>
      )}
    </Box>
  );
};

export interface ListNoteItemProps {
  noteId: string;
  activeNoteId?: string;
}

export const ListNoteItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "noteId" && prop !== "activeNoteId",
})<ListNoteItemProps>(({ theme, noteId, activeNoteId }) => {
  return {
    boxSizing: "border-box",
    padding: "0px",
    paddingRight: "8px",
    "&:hover": {
      cursor: "pointer",
    },
    backgroundColor:
      noteId && activeNoteId && noteId === activeNoteId
        ? `${hexToRgba(theme.palette.primary.main, 0.2)}`
        : "transparent",
  };
});

interface RecursiveNoteListProps {
  depth?: number;
  notes: NoteResponse[];
  handleSelectNote: (noteId: string) => void;
  handleCreateNote: (parentId?: string) => void;
  handleMenuOpen: (
    event: React.MouseEvent<HTMLElement>,
    noteId?: string
  ) => void;
  handleOpenShareDialog: (noteId: string) => void;
}

const RecursiveNoteList = (props: RecursiveNoteListProps) => {
  const {
    depth,
    notes,
    handleSelectNote,
    handleCreateNote,
    handleMenuOpen,
    handleOpenShareDialog,
  } = props;
  const { activeNoteId } = useNoteStore();
  const account = useAuthStore((state) => state.account);
  const [showNested, setShowNested] = useState<Record<string, boolean>>({});

  const handleShowNested = (noteId: string) => {
    setShowNested({ ...showNested, [noteId]: !showNested[noteId] });
  };

  let itemDepth = depth || 0;

  return (
    <Box
      id={activeNoteId + "-notes" + itemDepth + "-box" + Math.random()}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {notes.map((note) => (
        <div key={note.id}>
          <ListNoteItem
            noteId={note.id}
            activeNoteId={activeNoteId}
            sx={{
              padding: "0px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                boxSizing: "border-box",
                paddingLeft: `calc(${itemDepth * 24}px + ${note.children && note.children.length > 0 ? "0px" : "12px"})`,
              }}
            >
              {note.children && note.children.length > 0 && (
                <ExpandNoteIcon
                  note={note}
                  isExpanded={showNested[note.id]}
                  handleExpandNote={handleShowNested}
                />
              )}
              <Box
                sx={{
                  width: "100%",
                  padding: "8px 0px",
                  boxSizing: "border-box",
                  marginRight: "auto",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onClick={() => {
                  handleSelectNote(note.id);
                }}
              >
                <Typography
                  noWrap
                  variant="title2"
                  sx={{
                    display: "block",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "140px",
                    width: "100%",
                  }}
                >
                  {note.title}
                </Typography>
              </Box>
              <NoteOptions
                depth={itemDepth}
                noteId={note.id}
                handleCreateNote={handleCreateNote}
                handleMenuOpen={(e) => handleMenuOpen(e, note.id)}
                handleOpenShareDialog={handleOpenShareDialog}
                isEditor={
                  note.collaborators?.length > 0 &&
                  note.collaborators.filter(
                    (c) =>
                      c.accessType !== NoteAccessType.VIEWER &&
                      c.account?.id === account?.id
                  ).length > 0
                }
              />
            </Box>
          </ListNoteItem>
          <Box
            sx={{
              display: !note.id || !showNested[note.id] ? "none" : "flex",
              boxSizing: "border-box",
            }}
          >
            {note.children && (
              <RecursiveNoteList
                depth={itemDepth + 1}
                notes={note.children}
                handleSelectNote={handleSelectNote}
                handleCreateNote={handleCreateNote}
                handleMenuOpen={handleMenuOpen}
                handleOpenShareDialog={handleOpenShareDialog}
              />
            )}
          </Box>
        </div>
      ))}
    </Box>
  );
};

export default HiveDrawer;
