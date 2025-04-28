'use client';
import { useState,useEffect } from "react";


export default function Menu(){
const [style,setStyle] = useState<"bg-green-300" | "bg-red-300" | "bg-yellow-300">('bg-red-300');
   


 return <>

  <div onDrop={(event)=>{
    event.preventDefault();
    event.stopPropagation();
    console.log("Drop event");
    setStyle('bg-green-300');
    console.log(event.dataTransfer.files[0]);
  }} onDragOver={(event)=>{
    event.preventDefault();
    event.stopPropagation();
    setStyle("bg-yellow-300")
    console.log();
  }} className={`w-full  h-10 ${style}`}>
  
  </div>
  <div  className="w-full absolute top-20 right-10 left-10   h-10 bg-slate-900"draggable onDrag={(e)=>{
    console.log("dragging...");
    e.dataTransfer.setData("data","samuel");
  }}>
Drag object
  </div>
  </>
}

function Header(){
    return   <div className="bg-blue-200 leading-6 flex flex-row items-center justify-around w-full h-10 text-slate-600 dark:text-slate-400 font-semibold underline p-1">
    <li>Documents</li>
    <li>Pdf Files</li>
    <li>Images</li>
    <li>Word Files</li>
</div>
}