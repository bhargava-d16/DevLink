import React, { useState } from "react";
import { useCodeStore } from "../store/useCodeStore";
import { useAuth } from "../store/useAuth";

const FileTree = () => {
  const { fileTree, openFile, activeFile } = useCodeStore();
  const [expanded, setExpanded] = useState(new Set());
  const { socket } = useAuth();

  const toggleFolder = (path) => {
    const newSet = new Set(expanded);
    if (newSet.has(path)) {
      newSet.delete(path);
    } else {
      newSet.add(path);
    }
    setExpanded(newSet);
  };

  const handleOpenFile = (fullPath) => {
    openFile(fullPath);
    if (socket) {
      socket.emit("open-file", fullPath); 
    }
  };

  const renderTree = (tree, parentPath = "", depth = 0) => {
    return Object.entries(tree).map(([name, value]) => {
      const fullPath = parentPath ? `${parentPath}/${name}` : name;
      const isExpanded = expanded.has(fullPath);
      const isFile = value === "file";

      return (
        <div key={fullPath}>
          {isFile ? (
            <div
              onClick={() => handleOpenFile(fullPath)}
              className={`pl-${depth * 4} py-1 cursor-pointer hover:bg-gray-700 ${
                activeFile === fullPath ? "bg-gray-800" : ""
              }`}
            >
              📄 {name}
            </div>
          ) : (
            <div>
              <div
                onClick={() => toggleFolder(fullPath)}
                className={`pl-${depth * 4} py-1 font-medium cursor-pointer hover:bg-gray-700`}
              >
                📁 {name}
              </div>
              {isExpanded && (
                <div>{renderTree(value, fullPath, depth + 1)}</div>
              )}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="w-64 h-full overflow-auto bg-[#1e1e1e] text-white p-2 border-r border-gray-800">
      <div className="text-sm font-bold mb-2">📁 Project Files</div>
      {renderTree(fileTree)}
    </div>
  );
};

export default FileTree;
