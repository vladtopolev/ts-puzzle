import Box from "@mui/material/Box";
import Code from "./sections/Code";
import Description from "./sections/Description";

const Dashboard = ({
  title,
  description,
  difficulty,
  labels,
}: {
  title: string;
  description: string;
  difficulty: string;
  labels: string[];
}) => {
  return (
    <Box
      sx={{
        backgroundColor: "grey.300",
        height: "100vh",
        p: 1,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box component="header" sx={{ py: 1 }}>
        <img src="/logo.png" alt="logo" width={40} height={40} />
      </Box>

      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Box sx={{ width: "50%" }}>
          <Description
            title={title}
            description={description}
            difficulty={difficulty}
            labels={labels}
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
        <Box sx={{ width: "50%" }}>
          <Code />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
