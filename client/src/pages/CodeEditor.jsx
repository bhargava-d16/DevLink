import React, { useMemo, useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { useCodeStore } from "../store/useCodeStore";
import FileTree from "../components/FileTree";
import { Play, Terminal, Settings, Save, Maximize2, Minimize2, Square } from "lucide-react";

// Judge0 API Configuration
const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com";
const RAPIDAPI_KEY = "738880c643mshb7f3596d900aea6p12a0c7jsnea829fadd1cf";

// Language ID mapping for Judge0
const LANGUAGE_IDS = {
  ".cpp": 54,    // C++ (GCC 9.2.0)
  ".c": 50,      // C (GCC 9.2.0)
  ".java": 62,   // Java (OpenJDK 13.0.1)
  ".py": 71,     // Python (3.8.1)
  ".js": 63,     // JavaScript (Node.js 12.14.0)
  ".ts": 74,     // TypeScript (3.7.4)
  ".go": 60,     // Go (1.13.5)
  ".rs": 73,     // Rust (1.40.0)
  ".rb": 72,     // Ruby (2.7.0)
  ".php": 68,    // PHP (7.4.1)
  ".cs": 51,     // C# (Mono 6.6.0.161)
  ".kt": 78,     // Kotlin (1.3.70)
};

// Get file extension
const getFileExtension = (filename) => {
  const lastDot = filename.lastIndexOf('.');
  return lastDot !== -1 ? filename.substring(lastDot) : '';
};

// Terminal Component
const TerminalComponent = ({ terminalOutput, isFullscreen, setIsFullscreen, currentPath, isRunning, onStopExecution }) => {
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [terminalOutput]);

  return (
    <div className={`bg-gray-900 border-t border-gray-700 flex flex-col transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-50' : 'h-64'}`}>
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Terminal className="w-4 h-4" />
            <span>Terminal</span>
            <span className="text-gray-500">•</span>
            <span className="text-blue-400">{currentPath}</span>
            {isRunning && (
              <>
                <span className="text-gray-500">•</span>
                <span className="text-orange-400 animate-pulse">Running...</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isRunning && (
            <button
              onClick={onStopExecution}
              className="p-1.5 hover:bg-red-600 bg-red-500 rounded transition-colors"
              title="Stop Execution"
            >
              <Square className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 hover:bg-gray-700 rounded transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div ref={terminalRef} className="flex-1 p-4 font-mono text-sm overflow-auto bg-gray-900 text-green-400">
        {terminalOutput.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap mb-1">
            <span className="text-gray-500">{new Date().toLocaleTimeString()}</span>
            <span className="ml-2">{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Input Modal Component
const InputModal = ({ isOpen, onClose, onSubmit, placeholder = "Enter input for your program..." }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
    setInput("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-96 max-w-90vw">
        <h3 className="text-lg font-semibold mb-4 text-white">Program Input</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="w-full h-32 p-3 bg-gray-700 text-white rounded border border-gray-600 resize-none"
            autoFocus
          />
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white font-medium"
            >
              Run with Input
            </button>
            <button
              type="button"
              onClick={() => { onSubmit(""); onClose(); }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium"
            >
              Run without Input
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function CodeEditor() {
  const { activeFile, fileTree, fileContents, setFileContent } = useCodeStore();
  const [terminalOutput, setTerminalOutput] = useState(["Code Editor Terminal - Ready to execute code"]);
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);
  const [executionToken, setExecutionToken] = useState(null);

  const currentPath = "~/workspace";

  const language = useMemo(() => {
    if (!activeFile) return "plaintext";
    if (activeFile.endsWith(".js")) return "javascript";
    if (activeFile.endsWith(".ts")) return "typescript";
    if (activeFile.endsWith(".cpp")) return "cpp";
    if (activeFile.endsWith(".c")) return "c";
    if (activeFile.endsWith(".py")) return "python";
    if (activeFile.endsWith(".java")) return "java";
    if (activeFile.endsWith(".html")) return "html";
    if (activeFile.endsWith(".css")) return "css";
    if (activeFile.endsWith(".json")) return "json";
    if (activeFile.endsWith(".md")) return "markdown";
    if (activeFile.endsWith(".go")) return "go";
    if (activeFile.endsWith(".rs")) return "rust";
    if (activeFile.endsWith(".rb")) return "ruby";
    if (activeFile.endsWith(".php")) return "php";
    if (activeFile.endsWith(".cs")) return "csharp";
    if (activeFile.endsWith(".kt")) return "kotlin";
    return "plaintext";
  }, [activeFile]);

  const fileValue = activeFile ? fileContents[activeFile] : "// Welcome to Code Editor\n// Select a file to start coding!";

  const handleEditorChange = (value) => {
    if (activeFile) setFileContent(activeFile, value);
  };

  const addToTerminal = (message, type = "info") => {
    setTerminalOutput(prev => [...prev, `[${type.toUpperCase()}] ${message}`]);
  };

  const clearTerminal = () => {
    setTerminalOutput([]);
  };

  // Submit code to Judge0
  const submitCode = async (sourceCode, languageId, input = "") => {
    try {
      const response = await fetch(`${JUDGE0_API_URL}/submissions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
        },
        body: JSON.stringify({
          source_code: sourceCode,
          language_id: languageId,
          stdin: input,
          wait: false
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.token;
    } catch (error) {
      addToTerminal(`Submission failed: ${error.message}`, "error");
      return null;
    }
  };

  // Get submission result
  const getSubmissionResult = async (token) => {
    try {
      const response = await fetch(`${JUDGE0_API_URL}/submissions/${token}`, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      addToTerminal(`Failed to get result: ${error.message}`, "error");
      return null;
    }
  };

  // Poll for result
  const pollForResult = async (token) => {
    const maxAttempts = 30; // 30 seconds timeout
    let attempts = 0;

    while (attempts < maxAttempts) {
      const result = await getSubmissionResult(token);
      if (!result) break;

      if (result.status.id <= 2) { // In Queue or Processing
        addToTerminal(`Status: ${result.status.description}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        attempts++;
      } else {
        return result;
      }
    }

    addToTerminal("Execution timeout", "error");
    return null;
  };

  // Handle code execution
  const executeCode = async (input = "") => {
    if (!activeFile || !fileContents[activeFile]) {
      addToTerminal("No file selected or file is empty", "error");
      return;
    }

    const fileExt = getFileExtension(activeFile);
    const languageId = LANGUAGE_IDS[fileExt];

    if (!languageId) {
      addToTerminal(`Language not supported: ${fileExt}`, "error");
      addToTerminal("Supported languages: C++, C, Java, Python, JavaScript, TypeScript, Go, Rust, Ruby, PHP, C#, Kotlin", "info");
      return;
    }

    setIsRunning(true);
    addToTerminal(`Executing ${activeFile}...`);
    addToTerminal(`Language: ${fileExt} (ID: ${languageId})`);

    if (input) {
      addToTerminal(`Input provided: ${input.length} characters`);
    }

    try {
      const token = await submitCode(fileContents[activeFile], languageId, input);
      if (!token) {
        setIsRunning(false);
        return;
      }

      setExecutionToken(token);
      addToTerminal(`Submission token: ${token}`);

      const result = await pollForResult(token);
      if (result) {
        addToTerminal(`Execution completed in ${result.time || 'N/A'}s`);
        addToTerminal(`Memory used: ${result.memory || 'N/A'} KB`);
        addToTerminal("--- OUTPUT ---");
        
        if (result.stdout) {
          addToTerminal(result.stdout.trim());
        }
        
        if (result.stderr) {
          addToTerminal("--- ERRORS ---");
          addToTerminal(result.stderr.trim(), "error");
        }
        
        if (result.compile_output) {
          addToTerminal("--- COMPILE OUTPUT ---");
          addToTerminal(result.compile_output.trim());
        }

        addToTerminal(`Exit Code: ${result.status.id} - ${result.status.description}`);
      }
    } catch (error) {
      addToTerminal(`Execution failed: ${error.message}`, "error");
    } finally {
      setIsRunning(false);
      setExecutionToken(null);
    }
  };

  const handleRunProject = () => {
    if (RAPIDAPI_KEY === "YOUR_RAPIDAPI_KEY_HERE") {
      addToTerminal("Please set your RapidAPI key for Judge0 API", "error");
      addToTerminal("Get your free key at: https://rapidapi.com/judge0-official/api/judge0-ce", "info");
      return;
    }

    clearTerminal();
    
    // Check if the language might need input
    const fileExt = getFileExtension(activeFile);
    const codeContent = fileContents[activeFile] || "";
    
    // Simple heuristic to detect if code might need input
    const needsInput = codeContent.includes("input(") || 
                      codeContent.includes("Scanner") || 
                      codeContent.includes("cin >>") || 
                      codeContent.includes("scanf") ||
                      codeContent.includes("readline") ||
                      codeContent.includes("Console.ReadLine");

    if (needsInput) {
      setShowInputModal(true);
    } else {
      executeCode();
    }
  };

  const handleStopExecution = () => {
    if (executionToken) {
      addToTerminal("Execution stopped by user", "warning");
      setIsRunning(false);
      setExecutionToken(null);
    }
  };

  const getSupportedLanguages = () => {
    return Object.keys(LANGUAGE_IDS).join(", ");
  };

  return (
    <div className="w-screen h-screen flex bg-black text-white">
      <FileTree />

      <div className="flex-1 flex flex-col">
        <div className="px-6 py-4 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Code Editor</h1>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-400">
              Supported: {getSupportedLanguages()}
            </div>
            <button
              onClick={handleRunProject}
              disabled={isRunning || !activeFile}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
            >
              <Play className="w-4 h-4" /> 
              {isRunning ? "Running..." : "Run Code"}
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex-1 relative">
            <Editor
              key={activeFile}
              height="100%"
              language={language}
              value={fileValue}
              onChange={handleEditorChange}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on',
                automaticLayout: true,
              }}
            />
          </div>

          <TerminalComponent
            terminalOutput={terminalOutput}
            isFullscreen={isFullscreen}
            setIsFullscreen={setIsFullscreen}
            currentPath={currentPath}
            isRunning={isRunning}
            onStopExecution={handleStopExecution}
          />
        </div>
      </div>

      <InputModal
        isOpen={showInputModal}
        onClose={() => setShowInputModal(false)}
        onSubmit={executeCode}
      />
    </div>
  );
}