import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import MarkdownComponent from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const Markdown = ({ markdown }: { markdown: string }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        fontFamily: theme.typography.fontFamily,
        fontSize: 14,
        "& code": {
          backgroundColor: "grey.100",
          p: 0.5,
        },
        "& pre": {
          backgroundColor: "grey.100",
          p: 1,
        },
      }}
    >
      <MarkdownComponent
        components={{
          code: (props) => {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");

            if (match) {
              return (
                <SyntaxHighlighter
                  language={match[1]}
                  PreTag="div"
                  customStyle={{
                    lineHeight: 1,
                    margin: 0,
                    padding: 1,
                    textWrap: "wrap",
                    fontSize: 12,
                  }}
                >
                  {String(children)}
                </SyntaxHighlighter>
              );
            }
            return (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      >
        {markdown}
      </MarkdownComponent>
    </Box>
  );
};

export default Markdown;
