import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { ReactNode } from "react";

const HeaderSection = ({
  title,
  icon,
}: {
  title: string;
  icon?: ReactNode;
}) => {
  return (
    <Box
      sx={{
        backgroundColor: "grey.100",
        p: 1,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontSize: 12,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        {icon}
        {title}
      </Typography>
    </Box>
  );
};

export default HeaderSection;
