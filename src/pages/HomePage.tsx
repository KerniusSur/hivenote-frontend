import { Box, Typography } from "@mui/material";
import ComputerUndraw from "assets/computer-undraw.svg";
import HiveButton from "components/HiveButton";

const HomePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        padding: "112px 64px",
        boxSizing: "border-box",
        gap: "64px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "50%",
            maxWidth: "50%",
            gap: "32px",
          }}
        >
          <Typography variant="h1" align="left">
            Resonate with the visitor's problem
          </Typography>

          <Typography variant="body2" align="left">
            Describe exactly what your product or service does to solve this
            problem. Avoid using verbose words or phrases.
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: "24px",
            }}
          >
            <HiveButton
              variant="contained"
              text="Get started"
              sx={{
                padding: "12px 24px",
                maxWidth: "152px",
              }}
            />
            <HiveButton
              variant="outlined"
              text="Learn more"
              sx={{
                padding: "12px 24px",
                maxWidth: "152px",
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "40%",
            flex: 1,
            gap: "32px",
            maxWidth: "40%",
          }}
        >
          <img
            src={ComputerUndraw as any}
            alt="computer-undraw"
            style={{
              width: "100%",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
