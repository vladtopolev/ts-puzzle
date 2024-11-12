import * as ts from "typescript";

export const CODE_UTILS = `
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false;
type Expect<T extends true> = T;
`;

export const transpileCode = (code: string) => {
  return ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.ESNext, strict: true },
    reportDiagnostics: true,
  });
};

export const isCodeTranspiledSuccessfully = (code: string) => {
  const result = transpileCode(code);
  if (result.diagnostics && result.diagnostics.length > 0) {
    return false;
  }
  return true;
};

export const testCase = (props: { case: string; expected: string }) =>
  `type Result = Expect<Equal<${props.expected},${props.case}>>`;
