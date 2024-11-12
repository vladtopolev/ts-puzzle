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

    console.log(diagnostics);

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

export const testCode = (code: string) => {
  const sourceFile = ts.createSourceFile(
    "test.ts",
    code,
    ts.ScriptTarget.Latest,
    true
  );

  // Create a TypeScript Program with the SourceFile
  const options = { noEmit: true }; // We don't need to emit files, just check for errors
  const host = ts.createCompilerHost(options);
  const program = ts.createProgram(["test.ts"], options, host);

  // Get diagnostics for the SourceFile
  const diagnostics = ts.getPreEmitDiagnostics(program, sourceFile);

  if (diagnostics.length > 0) {
    // If there are diagnostics (errors), return them
    return { success: false, errors: diagnostics.map((d) => d.messageText) };
  } else {
    // Otherwise, transpile the code
    const result = ts.transpileModule(code, {
      compilerOptions: {
        target: ts.ScriptTarget.ESNext,
        module: ts.ModuleKind.ESNext,
      },
    });
    return { success: true, output: result.outputText };
  }
};

export function compileTypeScript(code: string): {
  success: boolean;
  output?: string;
  errors?: string[];
} {
  // Create a SourceFile from the TypeScript code
  const sourceFile = ts.createSourceFile(
    "test.ts",
    code,
    ts.ScriptTarget.Latest,
    true
  );

  // Create a minimal compiler host and program to check diagnostics
  const options: ts.CompilerOptions = {
    noEmit: true,
    //lib: ["lib.dom.d.ts", "lib.esnext.d.ts"],
  }; // We don't need to emit files, just check for errors
  const host: ts.CompilerHost = {
    fileExists: (fileName) => true,
    readFile: (fileName) => {
      console.log("fileName", fileName);
      if (fileName === "lib.d.ts") {
        // Return the content of the default lib.d.ts file (you might want to use the default one or include it)
        return ""; // Normally, the content of `lib.d.ts` will be returned here.
      }
      return code;
    },
    getSourceFile: (fileName) => sourceFile,
    writeFile: (fileName, content) => {},
    getDefaultLibFileName: (options) => "lib.d.ts",
    useCaseSensitiveFileNames: () => true,
    getCanonicalFileName: (fileName) => fileName,
    getCurrentDirectory: () => "",
    getNewLine: () => "\n",
  };

  // Create the program with the custom host
  const program = ts.createProgram(["test.ts"], options, host);

  // Get diagnostics for the SourceFile (using the Program)
  const diagnostics = ts.getPreEmitDiagnostics(program, sourceFile);

  if (diagnostics.length > 0) {
    // If there are diagnostics (errors), return them
    return {
      success: false,
      errors: diagnostics.map((d) => d.messageText as string),
    };
  } else {
    // Otherwise, transpile the code to JavaScript
    const result = ts.transpileModule(code, {
      compilerOptions: {
        target: ts.ScriptTarget.ESNext,
        module: ts.ModuleKind.ESNext,
        lib: ["dom", "esnext"],
      },
    });
    return { success: true, output: result.outputText };
  }
}
