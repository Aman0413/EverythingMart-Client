import React, { useState } from "react";
import axios from "../utils/axiosClient";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getAllOrders } from "../redux/slices/orderSlice";

function UploadModal({ show, hide }) {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const uploadFile = async (data) => {
    try {
      const formData = new FormData();
      formData.append("csvFile", data);
      console.log("formdata", formData);

      const res = await axios.post("/admin/uploadFile", formData);
      if (res.status === 200) {
        toast.success("File Uploaded Successfully");
        dispatch(getAllOrders());
        hide(false);
      }
    } catch (error) {
      toast.error("Error Uploading File");
      console.log(error);
    }
  };

  if (!show) return null;

  return (
    <div
      className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover "
      id="modal-id"
    >
      <div className="absolute bg-black opacity-80 inset-0 z-0 "></div>
      <div className="w-full  max-w-xl  relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
        <div class=" font-sans text-gray-900  border-box">
          <div class="flex flex-col items-center justify-center w-full h-auto my-10 bg-white">
            <div class="mt-10 mb-10 text-center">
              <h2 class="text-2xl font-semibold mb-2">Upload your files</h2>
              <p class="text-xs text-gray-500">File should be of format CSV</p>
            </div>
            <form
              action="#"
              class="relative w-4/5 h-32 max-w-xs mb-10  bg-gray-100 rounded-lg shadow-inner"
            >
              <input
                type="file"
                id="file-upload"
                class="hidden"
                accept=".csv"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
              <label
                for="file-upload"
                class="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer"
              >
                <p class="z-10 text-xs font-light text-center text-gray-500">
                  Drag & Drop your files here
                </p>
                <p>{file?.name}</p>
                <svg
                  class="z-10 w-8 h-8 text-indigo-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                </svg>
              </label>
            </form>

            <div className="flex flex-col justify-center items-center  p-6 gap-1">
              <p className="font-bold">Instructions</p>
              <p className="font-semibold">Avoid Spaces in Field Names</p>
              <p className="text-center text-gray-500 leading-relaxed">
                When uploading your CSV file, please ensure that the field names
                (column headers) do not contain any spaces. Instead of using
                spaces, consider using underscores (_) to separate words within
                a field name.{" "}
                <span className="font-semibold">
                  For example, if you have a field representing "Order ID"
                  modify it to "Order_ID" before uploading the CSV file.
                </span>
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="pb-8 text-center space-x-4 md:block">
            <button
              className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg 
        
          border-blue-400
          borhover:bg-gray-100 transition duration-300 ease-in-out active:scale-95"
              onClick={() => {
                hide(false);
              }}
            >
              Cancel
            </button>
            <button
              className="mb-2 md:mb-0 bg-blue-500 border border-dark-purple-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-dark-blue transition duration-300 ease-in-out active:scale-95"
              onClick={() => {
                uploadFile(file);
              }}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadModal;
