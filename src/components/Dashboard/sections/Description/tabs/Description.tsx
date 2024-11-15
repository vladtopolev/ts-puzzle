import { Chip, Paper, Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Markdown from "../../../../ui/Markdown";
import DifficultyLabel from "../components/DifficultyLabel";
import { useDashboardContext } from "../../../Dashboard.context";

const Description = () => {
  const {
    challenge: { title, labels, difficulty, description },
  } = useDashboardContext();
  return (
    <Paper sx={{ height: "100%", overflow: "hidden" }}>
      <Box sx={{ p: 1 }}>
        <Typography variant="h6" sx={{ fontSize: 24, fontWeight: 600 }}>
          {title}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
          <DifficultyLabel difficulty={difficulty} />
          {labels.map((label) => (
            <Chip label={label} key={label} size="small" icon={<></>} />
          ))}
        </Box>
        <Markdown>{description}</Markdown>
      </Box>
    </Paper>
  );
};

export default Description;
