import React, { useEffect } from 'react'
import Editor from "@monaco-editor/react";
import { useCodeStore } from "../store/useCodeStore";
import { useNavigate } from 'react-router-dom';
const CodeEditor = () => {
  
    const { activeFile, fileContents, setFileContent } = useCodeStore();

    const handleEditorChange = (value) => {
          if (activeFile) {
             setFileContent(activeFile, value);
          }
     };

     const fileValue = activeFile ? fileContents[activeFile] : "// Select a file";
    
  return (
     <div className="w-screen h-screen bg-black text-white flex flex-col">
      <div className="p-4 border-b border-gray-700 text-lg font-semibold">
        Collaborative Code Editor
      </div>
      
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          value={fileValue}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            fontSize: 17,
            minimap: { enabled: false },
            wordWrap: 'on',
          }}
        />
      </div>
    </div>
  )
}

export default CodeEditor
