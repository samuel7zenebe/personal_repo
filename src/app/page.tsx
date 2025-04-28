'use client'
import Image from "next/image";
import { useEffect,useState } from "react";
import FileExtension from "../components/extensionFile";
import Header from "@/components/Header";
export default function Home() {
const [width,setWidth] = useState('w-5');
const [fileSelected,setFileSelected] = useState<boolean>(false);

const [files,setFiles] = useState<object []>([])

useEffect(()=>{
 console.log("File interpretation...");
})
  return (
    <div className="flex flex-col items-center justify-center m-10 ">
    <Header />
   <h1 className="heading m-2 h-5 font-bold text-blue-400"> File Uploading Feature.. </h1>
 
        <input multiple onChange={async  (e)=>{
          let file:File | null = e.target.files[0];
      
          
          const reader = new FileReader();   
          
          reader.onprogress = (event)=>{
          
            const percentLoaded = Math.floor(event.loaded/event.total*100);
            console.log(file.name.split(".")[1]);
            setWidth(`w-${percentLoaded}`);        
          }
          reader.onloadend = ()=>{
            setFileSelected(false);
          }
          if(file){
            reader.readAsArrayBuffer(file);   
            setFileSelected(true);
            setFiles(files=>[...files,{
              name: file.name,
              size: file.size,
              lastModified: file.lastModified
            }])
          }
        }}  className="text-slate-500  border-slate-900 border-1 p-2 rounded-lg w-100" type="file" name="file" id="file" />
{
   <div>

    {

      files?.map((file,index)=> (
      <div className="flex flex-row items-center justify-start bg-slate-100 m-1 px-2 py-1 pointer rounded-sm hover:bg-slate-200" key={index}>
       
        <FileExtension extension={file?.name.split(".")[1]} />
        <p className="p-1 m-1 text-sm  font-semibold"> {file?.name}</p>
        <p className="p-1 m-1 text-sm font-bold">
  {file?.size/1000}MB
</p>
        <p className="p-1 m-1 text-sm text-red-900">
          {new Date(file?.lastModified).toISOString().split('T')[0]}
        </p>

      </div>  

      ))
    }
  </div>
}
      {
        fileSelected &&  <div className={`bg-blue-400 h-6 mt-2 p-2 rounded-sm h-10 px-width text-white  ${width}`}>
        {width.slice(2,width.length)} %
     </div>
      }
      <div className="text-slate-800">
         {
          files.length > 5 && <h1> Uploading alot of files...</h1>
         }
      </div>
    </div>
  );
}
