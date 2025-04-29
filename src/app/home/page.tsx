"use client";
import LibrarySvg from "@/public/images/library.svg";
import { useState, useEffect, useRef, ChangeEvent } from "react";

type FileName = string;

export default function Menu() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pickedFiles, setPickedFiles] = useState<FileName[]>([]);
  const [uploadedPercent, setUploadedPercent] = useState(0);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const reader = new FileReader();
      const file = e.target.files[0];

      reader.onload = () => {
        console.log("ONload");
        console.log(reader.result);
        setUploadedPercent(100);
        if (reader.result) {
          setPickedFiles([...pickedFiles, reader.result?.toString()]);
        }
      };
      reader.onprogress = async (e: ProgressEvent) => {
        setUploadedPercent(Math.floor(e.loaded / e.total) * 100);
        console.log(uploadedPercent);
      };
      reader.readAsDataURL(file);
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
          const buffer = new ArrayBuffer(1024 * 1024);
          const data = new Int16Array(3);

          console.log("typed Array Data...", data.fill(34));
        }}
        className="w-40 bg-green-800 text-white m-2 p-1 rounded-sm "
      >
        Select File
      </button>
      <div>
        <h1 className="text-xl text-green-700 ">{uploadedPercent}</h1>
        {pickedFiles.map((file) => (
          <h2
            key={file}
            className="bg-slate-200 text-2xl text-green-800 p-1 m-1 w-80 overflow-hidden"
          >
            {file}
          </h2>
        ))}
      </div>
      <div className="flex flex-row">
        {pickedFiles.length > 0 &&
          pickedFiles.map((file) => (
            <div key={file}>
              <img
                className="bg-green-400 m-1 rounded-xl"
                width={200}
                height={200}
                src={file || LibrarySvg}
                alt=""
              />
            </div>
          ))}
      </div>
    </section>
  );
}
