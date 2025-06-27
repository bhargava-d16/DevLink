import React, { useMemo, useState } from "react";
import Editor from "@monaco-editor/react";
import { useCodeStore } from "../store/useCodeStore";
import FileTree from "../components/FileTree";

const CodeEditor = () => {
  const { activeFile, fileContents, setFileContent } = useCodeStore();

  const handleEditorChange = (value) => {
    if (activeFile) {
      setFileContent(activeFile, value);
    }
  };

  const language = useMemo(() => {
    if (!activeFile) return "plaintext";
    if (activeFile.endsWith(".js")) return "javascript";
    if (activeFile.endsWith(".ts")) return "typescript";
    if (activeFile.endsWith(".cpp")) return "cpp";
    if (activeFile.endsWith(".c")) return "c";
    if (activeFile.endsWith(".py")) return "python";
    if (activeFile.endsWith(".html")) return "html";
    if (activeFile.endsWith(".css")) return "css";
    return "plaintext";
  }, [activeFile]);

  const fileValue = activeFile ? fileContents[activeFile] : "// Select a file";

  return (
    <div className="w-screen h-screen flex bg-black text-white">
      <FileTree />

      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-700 text-lg font-semibold">
          Collaborative Code Editor
        </div>
        <div className="flex-1">
          <Editor
            key={activeFile}
            height="100%"
            language={language}
            value={fileValue}
            onChange={handleEditorChange}
            theme="vs-dark"
            options={{
              fontSize: 16,
              minimap: { enabled: false },
              wordWrap: "on",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
