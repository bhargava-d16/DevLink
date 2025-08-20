
import JSZip from "jszip";
import toast from "react-hot-toast";
import { axiosInstance } from "./axios";
import { useCodeStore } from "../store/useCodeStore";
import { buildFolderTree } from "../utils/buildFolderTree";


export const isReady=async({type,file,url,})=>{

  const store = useCodeStore.getState();
  if(type=='zip'){
    try{
       const reader= new FileReader();
       reader.onload=async(event)=>{

          const toastId=toast.loading("Extracting project files");
          const arrayBuffer=event.target.result;
          const zip=await JSZip.loadAsync(arrayBuffer);
     
          const files={};
          const filePromises=Object.keys(zip.files).map(async(filePath)=>{
            const currentFile=zip.files[filePath];
            if(!currentFile.dir && !filePath.includes('node_modules') && !filePath.includes('.git')){
              const content=await currentFile.async("text");
              files[filePath]=content;
            }
          });
          await Promise.all(filePromises);
          
          Object.entries(files).forEach(([filePath, content]) => {
               store.setFileContent(filePath, content);
          });

         
          const tree = buildFolderTree(files);
          store.setFileTree(tree);

        
          const defaultFile = Object.keys(files).find(f => f.includes("index.js")) || Object.keys(files)[0];
          store.openFile(defaultFile);
          toast.success("Extraction successful", { id: toastId });
          console.log("Extracted files:",files);
       }
       reader.readAsArrayBuffer(file);

    }
    catch(error){
        console.log(error);
    }
  }
else if (type === "github" && url) {
  try {
    const toastId = toast.loading("Extracting project files");
    const response = await axiosInstance.post("/extractinfo", { url });

    console.log("GitHub API response:", response.data); // 👈 check structure

    const files = response.data?.files;

    if (files && Object.keys(files).length > 0) {
      Object.entries(files).forEach(([filePath, content]) => {
        store.setFileContent(filePath, content);
      });

      const tree = buildFolderTree(files);
      store.setFileTree(tree);

      const fileKeys = Object.keys(files);
      if (fileKeys.length > 0) {
        const defaultFile = fileKeys.find(f => f.includes("index.js")) || fileKeys[0];
        store.openFile(defaultFile);
      }

      toast.success("Extraction successful", { id: toastId });
    } else {
      toast.error("No files found in response.", { id: toastId });
    }
  } catch (error) {
    console.log("GitHub extraction error:", error);
    toast.error("Extraction failed");
  }
}


}

