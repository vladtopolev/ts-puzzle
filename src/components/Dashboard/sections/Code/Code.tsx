import { Editor } from "@monaco-editor/react";
import CodeIcon from "@mui/icons-material/Code";
import { Button, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import { useMeasure } from "react-use";
import HeaderSection from "../../components/HeaderSection";

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
      <Box
        className="editor"
        ref={ref}
        sx={{
          flexGrow: 1,
          display: "flex",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            overflow: "scroll",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        >
          <Editor
            height={reactRef.height}
            options={{ minimap: { enabled: false } }}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", p: 1 }}>
        <Button variant="outlined" size="small">
          Run
        </Button>
        <Button variant="contained" size="small">
          Submit
        </Button>
      </Box>
    </Paper>
  );
};

export default Code;