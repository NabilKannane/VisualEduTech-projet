import React, { useState , useCallback} from "react";
import { useDropzone } from "react-dropzone";
import {toast} from 'react-toastify';

export default function DropZone() {

  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };


  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles(acceptedFiles)
      console.log("dropped",acceptedFiles);
    }
  
    if (rejectedFiles?.length) {
  
      console.log("rejected");
     }
      }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "video/x-msvideo": [],
      "video/mp4": [],
      "video/mpeg": [],
      "video/ogg": [],
      "video/mp2t": [],
      "video/webm": [],
    },
    maxFiles: 10,
    onDrop,
    });



  const handleUpload2 = async () => {
    const formData = new FormData()

    formData.append("video", files[0]);

fetch("http://localhost:5000/upload", {
        method: 'POST',
        body: formData
    })
        .then((res) => {
          if(res.status == 500){
            toast.warning("You didn't upload anything",  toastOptions);
          }
          if(res.status == 200){
            console.log(res);
            toast.success('Upload successful!',  toastOptions);
          }
        })
        .catch((err) => {
          console.error("Error occured", err);
        toast.error('Upload failed!', toastOptions);
      });

  };

  
  return (
    <>
      <section className="container flex flex-col items-center p-5 border-2 rounded border-dashed border-gray-300 bg-gray-50 text-gray-700 transition duration-300 ease-in-out focus:outline-none">
      <div
          {...getRootProps({
            className: '',
          })}
        >
          <input {...getInputProps({ name: "file" })} />
          <div className="flex flex-col items-center justify-center gap-4">
            {/* <ArrowUpTrayIcon className="h-5 w-5 fill-current" /> */}
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag & drop files here, or click to select files</p>
            )}
          </div>
        </div>
        <aside className=" w-[95%]  px-4">
          <h4 className="bg-gray-100 p-1 text-center rounded-lg">Accepted Files</h4>
          <ul className="px-4 mt-3 ">{files[0]?.name}</ul>
        </aside>
      </section>
      <div className="w-full flex items-center justify-center">
  <button class="bg-blue-900 px-6 py-2 rounded-xl my-8 text-white flex items-center justify-center space-x-2 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-50"
  onClick={handleUpload2}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
    <span>Upload</span>
  </button>
</div>
    </>
  );
}
