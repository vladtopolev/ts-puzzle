export const Challenges = [
  {
    title: "Get Return Type",
    difficulty: "easy",
    labels: ["infer", "ts-utils", "built-in", "conditional-types"],

    testCases: [
      {
        case: "MyReturnType<() => string>",
        expected: "string",
      },
      { case: "MyReturnType<(v: boolean) => number>", expected: "number" },
      {
        case: "const fn = () => 1; \n MyReturnType<typeof fn>",
        expected: "1",
      },
    ],
    description: `
Implement the built-in \`ReturnType<T>\` generic without using it.

For example

\`\`\`ts
const fn = (v: boolean) => {
  if (v)
    return 1
  else
    return 2
}

type a = MyReturnType<typeof fn> // should be "1 | 2"
\`\`\`
`,
  },
];
