import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import DescriptionIcon from "@mui/icons-material/Description";
import ScienceIcon from "@mui/icons-material/Science";
import Box from "@mui/material/Box";
import Section from "../../components/Section";
import Description from "./tabs/Description";
import TestCases from "./tabs/TestCases";
import Solutions from "./tabs/Solutions";
import { TestCase } from "../../../../data";

const iconSx = { fontSize: 14, color: "info.light" };

export const EnhancedDescription = ({
  title,
  description,
  labels,
  difficulty,
  testCases,
}: {
  title: string;
  description: string;
  labels: string[];
  difficulty: string;
  testCases: TestCase[];
}) => {
  return (
    <Section
      activeTab="description"
      tabs={
        [
          {
            title: "Description",
            icon: <DescriptionIcon sx={iconSx} />,
            view: (
              <Description
                title={title}
                description={description}
                labels={labels}
                difficulty={difficulty}
              />
            ),
            id: "description",
          },
          {
            title: "Test Cases",
            icon: <ChecklistRtlIcon sx={iconSx} />,
            view: <TestCases testCases={testCases} />,
            id: "tests",
          },
          {
            title: "Solutions",
            icon: <ScienceIcon sx={iconSx} />,
            view: <Solutions />,
            id: "solutions",
          },
        ] as const
      }
    />
  );
};

export default EnhancedDescription;