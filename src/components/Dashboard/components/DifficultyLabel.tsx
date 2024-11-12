import { Chip, ChipProps } from "@mui/material";

const ColorMap: { [k: string]: ChipProps["color"] } = {
  easy: "success",
  medium: "warning",
  hard: "error",
};

const DifficultyLabel = ({ difficulty }: { difficulty: string }) => {
  return (
    <Chip
      color={ColorMap[difficulty] || "default"}
      size="small"
      label={difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
    />
  );
};

export default DifficultyLabel;
