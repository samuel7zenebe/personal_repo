"use client";
import { useState, useEffect, useRef, ChangeEvent } from "react";

type FileName = string;

export default function Menu() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pickedFiles, setPickedFiles] = useState<FileName[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setPickedFiles([...pickedFiles, file.name]);
    } else {
      console.log("No image file chosen ");
    }
  };
  return (
    <section>
      <input
        onChange={handleFileChange}
        ref={inputRef}
        hidden={true}
        type="file"
        name="file"
        id="file"
      />
      <button
        onClick={() => {
          inputRef.current?.click();
        }}
        className="w-40 bg-green-800 text-white m-2 p-1 rounded-sm "
      >
        Select File
      </button>
      <div>
        {pickedFiles.map((file) => (
          <h2
            key={file}
            className="bg-slate-200 text-2xl text-green-800 p-1 m-1"
          >
            {file}
          </h2>
        ))}
      </div>
    </section>
  );
}
