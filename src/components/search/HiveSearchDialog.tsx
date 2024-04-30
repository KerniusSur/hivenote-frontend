import { Collapse, Dialog, Divider, Slide, useTheme } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { NoteResponse } from "api/data-contracts";
import { HiveSearch, HiveSearchValues } from "components/search/HiveSearch";
import HiveSearchItem from "components/search/HiveSearchItem";
import { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { surfaceLight } from "utils/theme/colors";

interface HiveSearchProps {
  open: boolean;
  resultItems: any[];
  handleSearch: (searchString: HiveSearchValues) => void;
  handleClose: () => void;
}

const HiveSearchDialog = (props: HiveSearchProps) => {
  const { open, resultItems, handleSearch, handleClose } = props;
  const theme = useTheme();
  const navigate = useNavigate();
  const [t, setT] = useState<NodeJS.Timeout | undefined>(undefined);
  const [searchString, setSearchString] = useState<string>("");

  const handleSubmit = (values: HiveSearchValues) => {
    console.log("submitting form");
    handleSearch(values);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={SearchDialogTransition}
      onClose={handleClose}
      hideBackdrop
      PaperProps={{
        sx: {
          position: "absolute",
          top: "10%",
          backgroundColor: theme.palette.background.paper,
          width: "80%",
          maxWidth: "none",
          // padding: "1rem",
          boxSizing: "border-box",
          borderRadius: "1rem",
        },
      }}
    >
      <HiveSearch
        name="searchString"
        hasResults={resultItems.length > 0}
        onChange={(e) => {
          e.persist();
          if (t) {
            clearTimeout(t);
          }
          setT(
            setTimeout(() => {
              handleSubmit({ searchString: e.target.value });
              setSearchString(e.target.value);
            }, 500)
          );
        }}
      />
      <Collapse
        in={resultItems.length > 0}
        timeout="auto"
        unmountOnExit
        sx={{
          backgroundColor: surfaceLight.surfaceContainerHigh,
          borderRadius: "0 0 1rem 1rem",
        }}
      >
        <Divider />
        <>
          {isNoteResponseArray(resultItems) &&
            resultItems.map((item, index) => (
              <HiveSearchItem
                sx={{
                  borderRadius:
                    index === resultItems.length - 1 ? "0 0 1rem 1rem" : "0",
                }}
                key={index}
                title={item.title || "No title"}
                description={getDescription(item, searchString)}
                handleClick={() => {
                  navigate(`/note/${item.id}`);
                  handleClose();
                }}
              />
            ))}
        </>
      </Collapse>
    </Dialog>
  );
};

const SearchDialogTransition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} timeout={400} />;
});

const isNoteResponse = (item: any): item is NoteResponse => {
  return (
    (item as NoteResponse).title !== undefined &&
    (item as NoteResponse).components !== undefined
  );
};

const isNoteResponseArray = (items: any[]): items is NoteResponse[] => {
  return items.every((item) => isNoteResponse(item));
};

const getDescription = (note: NoteResponse, searchString: string): string => {
  if (note.title?.includes(searchString)) {
    return "";
  }

  const first50Chars = note.components?.reduce((acc, component) => {
    if (acc.length < 50) {
      return (
        acc + component.properties?.text ??
        component.properties?.title ??
        component.properties?.message ??
        component.properties?.caption ??
        component.properties?.html ??
        ""
      );
    }
    return acc;
  }, "");

  console.log(first50Chars);

  return first50Chars ?? "";
};
export default HiveSearchDialog;
