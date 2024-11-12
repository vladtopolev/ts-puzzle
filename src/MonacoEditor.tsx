// src/MonacoEditor.tsx
import React, { useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";

interface MonacoEditorProps {
  challengeTemplate: string;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({ challengeTemplate }) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [output, setOutput] = useState<string>("");

  useEffect(() => {
    // Initialize Monaco Editor
    editorRef.current = monaco.editor.create(
      document.getElementById("editor") as HTMLElement,
      {
        value: challengeTemplate,
        language: "typescript",
        theme: "vs-dark",
      }
    );

    // Clean up the editor instance on component unmount
    return () => {
      editorRef.current?.dispose();
    };
  }, [challengeTemplate]);

  /*
  const runTests = async () => {
    const userCode = editorRef.current?.getValue() || "";

    try {
      const result = tsWasm.transpileModule(userCode, {
        compilerOptions: { module: tsWasm.ModuleKind.ESNext },
        reportDiagnostics: true,
      });

      const diagnostics = result.diagnostics;
      if (diagnostics && diagnostics.length > 0) {
        // Collect errors and display them
        const errors = diagnostics
          .map((diag) =>
            tsWasm.flattenDiagnosticMessageText(diag.messageText, "\n")
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
    } catch (error) {
      setOutput(`Error: ${(error as Error).message}`);
    }
  };
  */

  return (
    <div>
      <div
        id="editor"
        style={{ height: "300px", width: "100%", marginBottom: "10px" }}
      ></div>
      {/*
      <button
        onClick={runTests}
        style={{ padding: "8px 16px", fontSize: "16px" }}
      >
        Run Tests
      </button>
      */}
      <pre style={{ whiteSpace: "pre-wrap", marginTop: "10px" }}>{output}</pre>
    </div>
  );
};

export default MonacoEditor;
