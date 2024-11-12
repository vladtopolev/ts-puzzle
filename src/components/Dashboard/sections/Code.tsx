import { Editor } from "@monaco-editor/react";
import CodeIcon from "@mui/icons-material/Code";
import { Button, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import HeaderSection from "../components/HeaderSection";
import { useMeasure } from "react-use";
const Code = () => {
  const [ref, reactRef] = useMeasure();

  return (
    <Paper
      sx={{
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HeaderSection
        title="Code"
        icon={<CodeIcon sx={{ fontSize: 14, color: "warning.light" }} />}
      />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ flexGrow: 1 }} ref={ref}>
          <Editor
            height={reactRef.height}
            options={{ minimap: { enabled: false } }}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", p: 1 }}>
          <Button variant="outlined" size="small">
            Run
          </Button>
          <Button variant="contained" size="small">
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Code;
