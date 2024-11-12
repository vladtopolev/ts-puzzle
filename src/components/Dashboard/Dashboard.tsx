import Box from "@mui/material/Box";
import Code from "./sections/Code/Code";
import Description from "./sections/Description/Description";
import Section from "./components/Section";
import { TestCase } from "../../data";

const Dashboard = ({
  title,
  description,
  difficulty,
  labels,
  testCases,
}: {
  title: string;
  description: string;
  difficulty: string;
  labels: string[];
  testCases: TestCase[];
}) => {
  return (
    <Box
      className="dashboard"
      sx={{
        backgroundColor: "grey.300",
        height: "100vh",
        maxHeight: "100vh",
        p: 1,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box component="header" sx={{ py: 1 }} className="dashboard__header">
        <img src="/logo.png" alt="logo" width={40} height={40} />
      </Box>

      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Box sx={{ width: "50%" }}>
          <Description
            title={title}
            description={description}
            difficulty={difficulty}
            labels={labels}
            testCases={testCases}
          />
        </Box>
        <Box
          sx={{
            width: 10,
            position: "relative",
            cursor: "ew-resize",
            "&::after": {
              content: '""',
              display: "none",
              position: "absolute",
              width: 2,
              backgroundColor: "primary.main",
              height: "100%",
              left: 9 / 2,
            },
            "&:hover::after": {
              display: "block",
            },
          }}
        />
        <Box sx={{ width: "50%", maxHeight: "100%" }}>
          <Code />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
