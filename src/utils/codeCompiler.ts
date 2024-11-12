import * as ts from "typescript";

const CODE_UTILS = `
export type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false;
export type Expect<T extends true> = T;
`;

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
