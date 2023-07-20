import html2pdf from "html2pdf.js";

function InvoiceModal({ show, hide, data }) {
  if (!show) return null;

  function generateUniqueInvoiceNumber() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000); // You can adjust the range for the random number as needed.
    const invoiceNumber = `${timestamp}${random}`;
    return invoiceNumber;
  }
  function formatDate(date) {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObject.getDate().toString().padStart(2, "0");

    return `${day}/${month}/${year}`;
  }
  const downloadInvoice = () => {
    const invoiceName = data?.name || "invoice";
    const invoiceDate = new Date().toISOString().slice(0, 10);

    const element = document.getElementById("invoice");
    const opt = {
      margin: 10,
      filename: `${invoiceName}_${invoiceDate}_invoice.pdf`, // Set the filename with the invoice name and date
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <div
      className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover "
      id="modal-id"
    >
      <div className="absolute bg-black opacity-80 inset-0 z-0 "></div>
      <div className="w-full  max-w-xl  relative mx-auto my-auto rounded-xl shadow-lg  bg-white py-5 overflow-scroll">
        <div>
          <div
            className="text-center p-2 flex-auto justify-center "
            id="invoice"
          >
            <div className="max-w-5xl mx-auto  bg-white">
              <article className="overflow-scroll max-h-[80vh]">
                <div className="bg-[white] rounded-b-md overflow-y-scroll">
                  <h2 className="p-3 text-3xl text-left">Invoice</h2>
                  <div className="p-5">
                    <div className="flex w-full">
                      <div className="grid grid-cols-4 gap-12">
                        <div className="text-sm font-light text-slate-500">
                          <p className="text-sm  text-slate-700 font-semibold">
                            Billed By
                          </p>
                          <p className="font-bold">Blaine Cottrell</p>
                          <p>55 Esk Street</p>
                          <p>Invercargill 9810</p>
                          <p>USA</p>
                        </div>
                        <div className="text-sm font-light text-slate-500">
                          <p className="text-sm font-semibold text-slate-700">
                            Billed To
                          </p>
                          <p className="font-bold">{data?.name}</p>
                          <p>USA</p>
                        </div>
                        <div className="text-sm font-light text-slate-500 flex items-center justify-center flex-col">
                          <p className="text-sm font-semibold text-slate-700">
                            Invoice Number
                          </p>
                          <p className="font-bold">
                            {generateUniqueInvoiceNumber()}
                          </p>

                          <p className="mt-2 text-sm font-normal text-slate-700">
                            Date of Issue
                          </p>
                          <p>{formatDate(data?.date)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-9">
                    <div className="flex flex-col mx-0 mt-8">
                      <table className="min-w-full divide-y divide-slate-500">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="pl-4 pr-3  text-sm font-semibold text-slate-700 sm:pl-6 md:pl-0 text-center"
                            >
                              Items
                            </th>
                            <th
                              scope="col"
                              className="hidden px-3  text-sm font-semibold text-slate-700 sm:table-cell text-center"
                            >
                              Quantity
                            </th>
                            <th
                              scope="col"
                              className="hidden py-3.5 px-3 text-right text-sm font-semibold text-slate-700 sm:table-cell"
                            >
                              Rate
                            </th>
                            <th
                              scope="col"
                              className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-slate-700 sm:pr-6 md:pr-0"
                            >
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.order.map((item, index) => {
                            return (
                              <tr
                                className="border-b border-slate-200 text-center"
                                key={index}
                              >
                                <td className=" pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                                  <div className="font-medium text-slate-700">
                                    {item.Item_Name}
                                  </div>
                                </td>
                                <td className="hidden px-3  text-sm text-center text-slate-500 sm:table-cell ">
                                  {item.Quantity}
                                </td>
                                <td className="hidden px-3 text-sm text-right text-slate-500 sm:table-cell">
                                  ${item.Unit_Price}
                                </td>
                                <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                  $
                                  {(item.Quantity * item.Unit_Price).toFixed(2)}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                        <tfoot>
                          <tr>
                            <th
                              scope="row"
                              colspan="3"
                              className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                            >
                              Subtotal
                            </th>

                            <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                              ${data.totalAmount}
                            </td>
                          </tr>

                          <tr>
                            <th
                              scope="row"
                              colspan="3"
                              className="hidden pt-4 pl-6 pr-3 text-sm font-semibold text-right text-slate-700 sm:table-cell md:pl-0"
                            >
                              Total
                            </th>

                            <td className="pt-4 pl-3 pr-4 text-sm  text-right text-slate-700 font-bold sm:pr-6 md:pr-0">
                              ${data.totalAmount}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <div className="p-3  mt-2 text-center space-x-4 md:block">
            <button
              className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 text-gray-600 rounded-full hover:shadow-lg 
              border-blue-700 
              hover:bg-gray-100 transition duration-300 ease-in-out active:scale-95"
              onClick={() => {
                hide(false);
              }}
            >
              Cancel
            </button>
            <button
              className="mb-2 md:mb-0 bg-blue-600 border border-dark-purple-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-dark-blue transition duration-300 ease-in-out active:scale-95 hover:bg-blue-700"
              onClick={downloadInvoice}
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceModal;
