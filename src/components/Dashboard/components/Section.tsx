import { Box, Paper, Typography } from "@mui/material";
import { ReactNode, useState } from "react";

function Section<
  T extends readonly {
    title: string;
    icon?: ReactNode;
    view: ReactNode;
    id: string;
  }[]
>({ tabs, activeTab }: { tabs: T; activeTab?: T[number]["id"] }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  return (
    <Paper
      sx={{
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{ display: "flex", gap: 1, backgroundColor: "grey.100", p: 0.5 }}
      >
        {tabs.map(({ icon, title, id }, index) => (
          <Typography
            variant="h3"
            key={id}
            sx={{
              fontSize: 12,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              cursor: "pointer",
              py: 0.5,
              px: 1,
              borderRadius: 1,
              opacity: activeTabIndex === index ? 1 : 0.5,
              "&:hover": {
                backgroundColor: "grey.200",
                opacity: 1,
              },
            }}
            onClick={() => setActiveTabIndex(index)}
          >
            {icon}
            {title}
          </Typography>
        ))}
      </Box>
      <Box sx={{ flexGrow: 1, position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: "scroll",
          }}
        >
          {tabs[activeTabIndex].view}
        </Box>
      </Box>
    </Paper>
  );
}

export default Section;
