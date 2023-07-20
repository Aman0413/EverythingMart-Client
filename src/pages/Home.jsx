import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { AiOutlinePrinter } from "react-icons/ai";
import InvoiceModal from "../components/InvoiceModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../redux/slices/orderSlice";
import UploadModal from "../components/UploadModal";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders.orders);
  const loading = useSelector((state) => state.orders.loading);

  function formatDate(date) {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObject.getDate().toString().padStart(2, "0");

    return `${day}/${month}/${year}`;
  }
  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  return (
    <div>
      <section className="container mx-auto p-4 transition-all ease-in-out duration-300 text-right  ">
        <button
          className="bg-blue-600 text-white font-semibold p-2 rounded-lg my-5  text-center transition duration-300 ease-in-out active:scale-95 hover:bg-blue-700"
          onClick={() => {
            setShowUploadModal(true);
          }}
        >
          Add Your Order File
        </button>
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg ">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold  text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3 text-center">Sno.</th>
                  <th className="px-4 py-3 text-center">Order ID</th>
                  <th className="px-4 py-3 text-center">Customer</th>
                  <th className="px-4 py-3 text-center">Total Amount</th>
                  <th className="px-4 py-3 text-center">Order Date</th>
                  <th className="px-4 py-3 text-center">Generate Invoice</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {loading && <Loader />}
                {orders &&
                  orders.map((item, index) => {
                    return (
                      <tr
                        className="text-gray-700 hover:bg-slate-100"
                        key={index}
                      >
                        <td className="px-4 py-3 border text-center">
                          <span className="text-center">{index + 1}</span>
                        </td>
                        <td className="px-4 py-3 text-ms font-semibold border text-center cursor-pointer transition duration-300 ease-in-out active:scale-110 hover:font-bold">
                          {item.orderId}
                        </td>
                        <td className="px-4 py-3  border text-center">
                          <span className="text-center text-lg">
                            {item.name}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm border text-center">
                          <span className="text-center text-lg font-medium">
                            $ {item.totalAmount}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm border text-center">
                          <span className="text-center text-lg">
                            {formatDate(item.date)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm border flex justify-center items-center">
                          <button
                            className="bg-blue-600 text-gray-100 p-2 rounded-lg
                          font-bold hover:bg-blue-700 transition-all ease-in-out duration-300 active:scale-95 flex justify-center items-center gap-2 text-center"
                            onClick={() => {
                              setData(item);
                              setShowModal(true);
                            }}
                          >
                            <span>
                              <AiOutlinePrinter className="font-extrabold" />
                            </span>
                            <span>Generate Invoice</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        {orders && orders.length <= 0 ? (
          <div className="flex justify-center items-center w-full ">
            <p className=" text-2xl font-bold text-center ">No Orders Found</p>
          </div>
        ) : (
          ""
        )}
      </section>

      {<InvoiceModal show={showModal} hide={setShowModal} data={data} />}
      {<UploadModal show={showUploadModal} hide={setShowUploadModal} />}
    </div>
  );
}

export default Home;
