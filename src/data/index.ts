export type TestCase = {
  case: string;
  expected: string;
  view: {
    case: string;
    expected: string;
  };
};

export type Challenge = {
  title: string;
  difficulty: "easy" | "medium" | "hard";
  labels: string[];
  testCases: TestCase[];
  description: string;
};

export const Challenges: Challenge[] = [
  {
    title: "Get Return Type",
    difficulty: "easy",
    labels: ["infer", "ts-utils", "built-in", "conditional-types"],

    testCases: [
      {
        view: {
          case: `
\`\`\`ts
MyReturnType<() => string>
\`\`\`
`,
          expected: `
\`\`\`ts
string
\`\`\`
`,
        },
        case: "MyReturnType<() => string>",
        expected: "string",
      },
      /*
      {
        case: "MyReturnType<() => 123>",
        expected: "123",
        view: {
          case: `
\`\`\`ts
MyReturnType<() => 123>
\`\`\`
`,
          expected: `
\`\`\`ts
123
\`\`\`
`,
        },
      },
      {
        case: " MyReturnType<() => Promise<boolean>>",
        expected: "Promise<boolean>",
        view: {
          case: `
\`\`\`ts
MyReturnType<() => Promise<boolean>>
\`\`\`
`,
          expected: `
\`\`\`ts
Promise<boolean>
\`\`\`
`,
        },
      },
      {
        case: "MyReturnType<() => () => 'foo'>>",
        expected: "() => 'foo'",
        view: {
          case: `
\`\`\`ts
MyReturnType<() => () => 'foo'>>>
\`\`\`
`,
          expected: `
\`\`\`ts
() => 'foo'
\`\`\`
`,
        },
      },
      {
        case: "const fn = (v: boolean) => v ? 1 : 2; MyReturnType<typeof fn>",
        expected: "1 | 2",
        view: {
          case: `\`\`\`ts
const fn = (v: boolean) => v ? 1 : 2;
MyReturnType<typeof fn>;
\`\`\`
`,
          expected: `
\`\`\`ts
1 | 2
\`\`\`
`,
        },
      },
      {
        case: "const fn1 = (v: boolean, w: any) => v ? 1 : 2; MyReturnType<typeof fn1>",
        expected: "1 | 2",
        view: {
          case: `
\`\`\`ts
const fn1 = (v: boolean, w: any) => v ? 1 : 2;
MyReturnType<typeof fn1>;
\`\`\`
`,
          expected: `
\`\`\`ts
1 | 2
\`\`\`
`,
        },
      },*/
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
