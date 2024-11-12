import { Box, Typography } from "@mui/material";
import { TestCase } from "../../../../../data";
import Markdown from "../../../../ui/Markdown";

const TestCases = ({ testCases }: { testCases: TestCase[] }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: 1,
        flexWrap: "wrap",
      }}
    >
      {testCases.map((test, index) => (
        <Box
          key={index}
          sx={{ borderLeft: "4px solid", borderColor: "grey.500", px: 1 }}
        >
          <Typography sx={{ fontSize: 10 }}>Test case:</Typography>
          <Markdown
            sx={{
              "& pre": {
                backgroundColor: "grey.100",
                p: 1,
                m: 0,
              },
              "& pre div": {
                overflowY: "auto",
              },
            }}
          >
            {test.view.case}
          </Markdown>
          <Typography sx={{ fontSize: 10, mt: 1 }}>Expected result:</Typography>
          <Markdown
            sx={{
              "& pre": {
                backgroundColor: "grey.100",
                p: 1,
                m: 0,
                overflowY: "hidden",
              },
              "& pre div": {
                overflowY: "auto",
              },
            }}
          >
            {test.view.expected}
          </Markdown>
        </Box>
      ))}
    </Box>
  );
};

export default TestCases;
