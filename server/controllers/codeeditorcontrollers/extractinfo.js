const JSZip=require("jszip");

const extractInfo=async (req,res) => {
    
    let {url}=req.body;
    url = url.replace(/\.git$/, "");
    const match=url.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) throw new Error("Invalid Github URL");
    const user=match[1];
    const repo=match[2];
    
    const zipUrl=`https://github.com/${user}/${repo}/archive/refs/heads/main.zip`;
         try{
           const response = await fetch(zipUrl);
           const arrayBuffer = await response.arrayBuffer();
           const zip = await JSZip.loadAsync(arrayBuffer);
    
           const files={};
           const filePromises=Object.keys(zip.files).map(async(filePath)=>{
           const currentFile=zip.files[filePath];
    
           if(!currentFile.dir && !filePath.includes('node_modules') && !filePath.includes('.git')){
              const content=await currentFile.async("text");
              files[filePath]=content;
           }
          });
          await Promise.all(filePromises);
          res.json({files});
        }
        catch (error) {
          console.error("GitHub fetch error:", error);
          res.status(500).json({ error: "Failed to fetch GitHub ZIP" });
        }
    };

module.exports=extractInfo;