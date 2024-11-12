import { createContext, ReactNode, useContext, useState } from "react";
import { Challenge } from "../../data";
import {
  CODE_UTILS,
  testCase,
  isCodeTranspiledSuccessfully,
} from "../../utils/codeCompiler";
import { checkIfTypeScriptCompatible, compileTypeScript } from "../../utils";

type DashboardContextType = {
  challenge: Challenge;
  userCode: string;
  setUserCode: (code: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  runTests: () => void;
};
const DashboardContext = createContext<DashboardContextType>(
  {} as DashboardContextType
);

const DashboardContextWrapper = ({
  children,
  challenge,
}: {
  children: ReactNode;
  challenge: Challenge;
}) => {
  const [userCode, setUserCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  const runTests = () => {
    const finalCode = `${userCode};${CODE_UTILS}${testCase(
      challenge.testCases[0]
    )}`;
    console.log(finalCode);
    const result = checkIfTypeScriptCompatible(finalCode);
    console.log(
      result,
      isCodeTranspiledSuccessfully(finalCode),
      compileTypeScript(finalCode)
    );
  };

  return (
    <DashboardContext.Provider
      value={{
        challenge,
        userCode,
        setUserCode,
        activeTab,
        setActiveTab,
        runTests,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextWrapper;

export const useDashboardContext = () => useContext(DashboardContext);
