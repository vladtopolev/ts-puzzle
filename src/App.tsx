// src/App.tsx
import React, { useState } from "react";
import { Challenges } from "./data";
import Dashboard from "./components/Dashboard/Dashboard";

const App: React.FC = () => {
  const [challenge, setChallenge] = useState(Challenges[0]);

  return <Dashboard challenge={challenge} />;
};

const challengeTemplate = `// TypeScript Challenge: Create a type LastItem that extracts the last item of an array
type LastItem<T> = /* Your solution here */

// Test cases
type Test1 = LastItem<[1, 2, 3]> extends 3 ? true : false;
type Test2 = LastItem<['a', 'b', 'c']> extends 'c' ? true : false;
type Test3 = LastItem<[boolean, string, number]> extends number ? true : false;

// Expected results: true for all tests
type AllTestsPass = Test1 extends true
  ? Test2 extends true
    ? Test3 extends true
      ? "All tests passed!"
      : "Test3 failed"
    : "Test2 failed"
  : "Test1 failed";
`;

/*
const App: React.FC = () => {

  const [value, setValue] = useState(challengeTemplate);
  const [output, setOutput] = useState<string>("");

  const runTests = async () => {
    const ts = await import("typescript");
    console.log(ts);
    try {
      const result = ts.transpileModule(value, {
        compilerOptions: { module: ts.ModuleKind.ESNext },
        reportDiagnostics: true,
      });
      const diagnostics = result.diagnostics;
      if (diagnostics && diagnostics.length > 0) {
        // Collect errors and display them
        const errors = diagnostics
          .map((diag) =>
            ts.flattenDiagnosticMessageText(diag.messageText, "\n")
          )
          .join("\n");
        setOutput(`Errors found:\n${errors}`);
      } else {
        // Check for "All tests passed!" in the output to determine if the solution is correct
        setOutput(
          result.outputText.includes("All tests passed!")
            ? "Challenge solved successfully!"
            : "Some tests failed. Check your solution."
        );
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div style={{ padding: "20px" }}>
      <h1>TypeScript Challenge Playground</h1>
      <button onClick={runTests}>test</button>
      {output}
      <Editor
        value={value}
        onChange={(newValue) => setValue(newValue || "")}
        defaultLanguage="typescript"
        height="90vh"
      />
    </div>
  );
};
*/

export default App;
