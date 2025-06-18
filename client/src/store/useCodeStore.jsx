import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import axios from "axios";
import toast from "react-hot-toast";

export const useCodeStore= create((set,get)=>({
          fileTree: {},          
          openFiles: [],      
          activeFile: null,      
          fileContents: {},
          setFileTree:(tree)=>set({fileTree:tree}),

           openFile: (filePath) =>
                 set((state) => {
                      const alreadyOpen = state.openFiles.includes(filePath);
                 return {
                 openFiles: alreadyOpen ? state.openFiles : [...state.openFiles, filePath],
                 activeFile: filePath,
                };
            }),

          closeFile: (filePath) =>
              set((state) => ({
                  openFiles: state.openFiles.filter((path) => path !== filePath),
                  activeFile:
                  state.activeFile === filePath ? state.openFiles[0] || null : state.activeFile,
          })),

           setFileContent: (filePath, content) =>
                set((state) => ({
                    fileContent: {
                      ...state.fileContent,
                      [filePath]: content,
                   },
            })),

           setActiveFile: (filePath) => set({ activeFile: filePath }),
}));
