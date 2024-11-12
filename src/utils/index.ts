//import ts from "typescript";
import * as ts from "typescript";

export const transpileCode = async (code: string) => {
  const ts = await import("typescript");
  return ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.ESNext, strict: true },
    reportDiagnostics: true,
  });
};

export const isCodeTranspiledSuccessfully = async (code: string) => {
  const result = await transpileCode(code);
  if (result.diagnostics && result.diagnostics.length > 0) {
    return false;
  }
  return true;
};

export function checkIfTypeScriptCompatible(codeString: string) {
  try {
    // Create a virtual file name for in-memory compilation
    const fileName = "temp.tsx";

    // Create a virtual SourceFile from the code string
    const sourceFile = ts.createSourceFile(
      fileName,
      codeString,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX // Use TSX if you need to handle JSX
    );

    // Set compiler options (customize as needed)
    const compilerOptions = {
      strict: true,
      jsx: ts.JsxEmit.React,
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
      lib: ["esnext", "dom"],
    };

    // Create a program and add the source file to it
    const program = ts.createProgram([fileName], compilerOptions, {
      fileExists: (fileName: string) => true, // Simulating file exists
      readFile: (fileName: string) =>
        fileName === "temp.tsx" ? sourceFile.getFullText() : "", // Return file content if it's the 'temp.tsx' file
      getSourceFile: (name: string) =>
        name === fileName ? sourceFile : undefined,
      writeFile: (name: string, text: string) => {},
      getDefaultLibFileName: () => "lib.d.ts", // Ensures TypeScript uses the standard library
      useCaseSensitiveFileNames: () => true,
      getCurrentDirectory: () => "",
      getCanonicalFileName: (fileName: string) => fileName,
      getNewLine: () => "\n",
    });

    // Run diagnostics to check for issues
    const diagnostics = [
      ...program.getSyntacticDiagnostics(sourceFile),
      ...program.getSemanticDiagnostics(sourceFile),
      //...program.getGlobalDiagnostics(),
    ];

    // If diagnostics are present, the code is not TypeScript compatible
    if (diagnostics.length > 0) {
      /*console.error("Errors found:");
      diagnostics.forEach((diagnostic) => {
        console.error(diagnostic.messageText);
      });
      */
      return false;
    }
    return true; // TypeScript compatible if no diagnostics
  } catch (error) {
    console.log("==>", error);
    return false;
  }
}
