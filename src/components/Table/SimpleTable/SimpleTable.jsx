import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import styles from "@/components/Table/SimpleTable/SimpleTable.module.css";
import { SiReadthedocs } from "react-icons/si";
import Link from "next/link";
import Button from "@/components/button/Button";
import {
  useAidAvalaibleOrNotByPharmacyMutation,
  useChangeOrderStatusMutation,
} from "@/Redux/OrderSlice/OrderSlice";
import Modal from "react-modal";
import { MdCancel } from "react-icons/md";
import Field from "@/components/inputFIeld/Field";
import { useRef, useState } from "react";
import { SelectBox } from "@/components/select/selectBox";
import ResponseToast from "@/components/toast/Toast";
import { usePathname, useRouter } from "next/navigation";
import { useSearch } from "@/app/SearchContext";
import React from "react";
import { useSelector } from "react-redux";

export function TablePri({ tableHead, pharmacy_table_data }) {
  const pathName = usePathname();
  const { searchQuery } = useSearch();

  const text_color = useSelector((state) => state.theme.text_color);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [getOrderID, setGetOrderID] = useState("");
  const phrma_ID = pharmacy_table_data?.[0]?.Pharmacy_id?._id;

  const [updateOrder, setUpdateOrder] = useState({
    order_status: "",
    price: "",
    description: "",
  });
  const { order_status, price, description } = updateOrder;
  const handelChange = (e) => {
    setUpdateOrder({ ...updateOrder, [e.target.name]: e.target.value });
  };

  // order-list pending update status api
  const [updateOrderStatus, { isLoading }] =
    useAidAvalaibleOrNotByPharmacyMutation();
  const handelChangeStatusSubmit = async () => {
    try {
      const res = await updateOrderStatus({
        phrma_id: phrma_ID,
        order_id: getOrderID,
        data: updateOrder,
      });
      ResponseToast({ res });
      setModalIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  // paid-orders update status api
  const [changeOrderStatus, load] = useChangeOrderStatusMutation();
  const handelChangeStatus = async () => {
    try {
      const res = await changeOrderStatus({
        phrma_id: phrma_ID,
        order_id: getOrderID,
        data: updateOrder,
      });
      ResponseToast({ res });
      setModalIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return pathName === "/paid-orders" ? (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        ariaHideApp={true}
        //   overlayClassName={styles.custom_overlay}
        className={`w--[20rem] border-2 border-[#de8127] w-fit w--[50%] h-fit h--[95%]  md:w--fit max--[340px]:h-[26rem] flex bg-white absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] p-4 rounded-xl overflow-hidden overflow-y-auto z-[9999]`}
      >
        <div className="border--2 border-[blue] w-full">
          <div className="border--2 border-[green] min-w-full h-fit h--[5rem] relative flex justify-between items-center">
            <div>
              <h2
                className={`max-[340px]:text-[1.3rem] text-2xl md:text-3xl lg:text-[2rem] font-semibold`}
              >
                Order Status
              </h2>
            </div>

            <div className="flex items-center">
              <button
                onClick={closeModal}
                className="bg-[white] p-1 rounded-2xl h-full ms-10"
              >
                <MdCancel
                  className={`max-[340px]:text-[1.3rem] text-2xl md:text-[2rem]`}
                />
              </button>
            </div>
          </div>

          <div className="border--2 border-[green] flex flex-col items-center">
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow--md">
              {/* {order_status === "Aid_Avalaible" ? (
                <>
                  <Field
                    type="text"
                    name="price"
                    placeHolder={"Price"}
                    value={price}
                    onChange={handelChange}
                  />

                  <Field
                    placeHolder={"Description"}
                    type="textarea"
                    name={"description"}
                    value={description}
                    className={`mt-4`}
                    onChange={handelChange}
                  />
                </>
              ) : null} */}

              <select
                name="order_status"
                value={order_status}
                onChange={handelChange}
                className={`flex h-9 w-full mt-4 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring--1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1`}
              >
                <option> Select Medicine Status </option>
                <option value="Dispatched"> Dispatched </option>
                <option value="Delivered"> Delivered </option>
                <option value="Completed"> Completed </option>
              </select>

              <div className="border--2 border-purple-900 md:col-span-4 lg:col-span-5 flex items-center justify-center mt-5">
                <Button
                  name={"Submit Order"}
                  textColor={"text-white-color"}
                  bgcolor={"bg-primary-color"}
                  pClass={"w-fit justify-center"}
                  mainClass={`mt-4 w-[90%] md:mt-0 md:w-[10rem] rounded-lg p-2 active:scale-95`}
                  // onClick={handelChangeStatusSubmit}
                  onClick={handelChangeStatus}
                  isLoading={load.isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            {tableHead.map((item, i) => (
              <TableHead
                key={i + 7}
                className={`${item.className} ${text_color} min-w-fit`}
              >
                {item.head}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {pharmacy_table_data?.filter(item => item._id.slice(-4)?.toLowerCase()?.includes(searchQuery?.toLowerCase())).map((items, i) =>
            items.order_status[0] === "Paid" ||
            items.order_status[0] === "Dispatched" ||
            items.order_status[0] === "Delivered" ? (
              <React.Fragment key={i + 1} >
                <TableRow
                  className={`${styles.tr_} border--2 border-green-900 p-3 text-[#787878]`}
                >
                  <TableCell className={`${items.className} text-center`}>
                    <abbr title={items._id}> {items._id.slice(-4)} </abbr>{" "}
                  </TableCell>
                  <TableCell className={`${items.className} text-center`}>
                    {items.user_id.name}
                  </TableCell>
                  <TableCell className={`${items.className} text-center`}>
                    {items.createdAt.split("T")[0]}
                  </TableCell>
                  <TableCell className={`${items.className} text-center`}>
                    {items.Order_type}
                  </TableCell>
                  <TableCell className={`${items.className} text-center`}>
                    {items.price}
                  </TableCell>
                  <TableCell className={`${items.className} text-center`}>
                    {items.order_status}
                  </TableCell>
                  <TableCell
                    className={`${items.className} text-center flex justify-center gap--3`}
                  >
                    {items.order_status[0] === "Paid" ? (
                      <>
                        <div className="border--2 border-purple-900 md:col-span-4 lg:col-span-5 flex items-center justify-center mt-[0.4rem]">
                          <Button
                            name={"Proceed"}
                            textColor={"text-white-color"}
                            bgcolor={"bg-primary-color"}
                            pClass={"w-fit justify-center"}
                            mainClass={`mt-4 w-[90%] md:mt-0 px-4 rounded-lg p-1 active:scale-95`}
                            onClick={() => (
                              setGetOrderID(items._id), setModalIsOpen(true)
                            )}
                          />
                        </div>
                      </>
                    ) : (
                      <Button
                        name={"Proceed"}
                        textColor={"text-white-color"}
                        bgcolor={"bg-slate-500"}
                        pClass={"w-fit justify-center"}
                        mainClass={`mt-4 w-[90%] md:mt-0 px-4 rounded-lg p-1 active:scale-95`}
                        className={"py-1 px-4 mt-[0.4rem]"}
                        disabled={true}
                      />
                    )}
                  </TableCell>
                  <TableCell className={`${items.className}`}>
                    <Link href={items.Prescription}>
                      {" "}
                      <div className="w-full flex justify-center">
                        {" "}
                        <SiReadthedocs className={`${text_color}`} />{" "}
                      </div>{" "}
                    </Link>{" "}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ) : (
              ''
            )
          )}
        </TableBody>
      </Table>
    </>
  ) : pathName === "/completed-orders" ? (
    <>
      {/* <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    contentLabel="Modal"
    ariaHideApp={true}
    //   overlayClassName={styles.custom_overlay}
    className={`w--[20rem] border-2 border-[#de8127] w-fit w--[50%] h-fit h--[95%]  md:w--fit max--[340px]:h-[26rem] flex bg-white absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] p-4 rounded-xl overflow-hidden overflow-y-auto z-[9999]`}
  >
    <div className="border--2 border-[blue] w-full">
      <div className="border--2 border-[green] min-w-full h-fit h--[5rem] relative flex justify-between items-center">
        <div>
          <h2
            className={`max-[340px]:text-[1.3rem] text-2xl md:text-3xl lg:text-[2rem] font-semibold`}
          >
            Order Status
          </h2>
        </div>

        <div className="flex items-center">
          <button
            onClick={closeModal}
            className="bg-[white] p-1 rounded-2xl h-full ms-10"
          >
            <MdCancel
              className={`max-[340px]:text-[1.3rem] text-2xl md:text-[2rem]`}
            />
          </button>
        </div>
      </div>

      <div className="border--2 border-[green] flex flex-col items-center">
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow--md">
          <select
            name="order_status"
            value={order_status}
            onChange={handelChange}
            className={`flex h-9 w-full mt-4 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring--1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1`}
          >
            <option> Select Medicine Status </option>
            <option value="Dispatched"> Dispatched </option>
            <option value="Delivered"> Delivered </option>
            <option value="Completed"> Completed </option>
          </select>

          <div className="border--2 border-purple-900 md:col-span-4 lg:col-span-5 flex items-center justify-center mt-5">
            <Button
              name={"Submit Order"}
              textColor={"text-white-color"}
              bgcolor={"bg-primary-color"}
              pClass={"w-fit justify-center"}
              mainClass={`mt-4 w-[90%] md:mt-0 md:w-[10rem] rounded-lg p-2 active:scale-95`}
              // onClick={handelChangeStatusSubmit}
              onClick={handelChangeStatus}
              isLoading={load.isLoading}
            />
          </div>
        </div>
      </div>
    </div>
      </Modal> */}
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            {tableHead.map((item, i) => (
              <TableHead
                key={i + 2}
                className={`${item.className} ${text_color} min-w-fit`}
              >
                {item.head}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {pharmacy_table_data?.filter(item => item._id.slice(-4)?.toLowerCase()?.includes(searchQuery?.toLowerCase())).map((items, i) =>
            items.order_status[0] === "Completed" ? (
              <React.Fragment key={i + 3}>
                <TableRow
                  className={`${styles.tr_} border--2 border-green-900 p-3 text-[#787878]`}
                >
                  <TableCell className={`${items.className} text-center`}>
                    <abbr title={items._id}> {items._id.slice(-4)} </abbr>{" "}
                  </TableCell>
                  <TableCell className={`${items.className} text-center`}>
                    {items.user_id.name}
                  </TableCell>
                  <TableCell className={`${items.className} text-center`}>
                    {items.createdAt.split("T")[0]}
                  </TableCell>
                  <TableCell className={`${items.className} text-center`}>
                    {items.Order_type}
                  </TableCell>
                  <TableCell className={`${items.className} text-center`}>
                    {items.price}
                  </TableCell>
                  <TableCell className={`${items.className} text-center`}>
                    {items.order_status}
                  </TableCell>
                  <TableCell
                    className={`${items.className} text-center flex justify-center gap--3`}
                  >
                    <Button
                      name={"Proceed"}
                      textColor={"text-white-color"}
                      bgcolor={"bg-slate-500"}
                      pClass={"w-fit justify-center"}
                      mainClass={`mt-4 w-[90%] md:mt-0 px-4 rounded-lg p-1 active:scale-95`}
                      className={"py-1 px-4 mt-[0.4rem]"}
                      disabled={true}
                    />
                  </TableCell>
                  <TableCell className={`${items.className}`}>
                    <Link href={items.Prescription}>
                      {" "}
                      <div className="w-full flex justify-center">
                        {" "}
                        <SiReadthedocs className={`${text_color}`} />{" "}
                      </div>{" "}
                    </Link>{" "}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ) : (
              ""
            )
          )}
        </TableBody>
      </Table>
    </>
  ) : (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        ariaHideApp={true}
        //   overlayClassName={styles.custom_overlay}
        className={`w--[20rem] border-2 border-[#de8127] w-fit w--[50%] h-fit h--[95%]  md:w--fit max--[340px]:h-[26rem] flex bg-white absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] p-4 rounded-xl overflow-hidden overflow-y-auto z-[9999]`}
      >
        <div className="border--2 border-[blue] w-full">
          <div className="border--2 border-[green] min-w-full h-fit h--[5rem] relative flex justify-between items-center">
            <div>
              <h2
                className={`max-[340px]:text-[1.3rem] text-2xl md:text-3xl lg:text-[2rem] font-semibold`}
              >
                Order Status
              </h2>
            </div>

            <div className="flex items-center">
              <button
                onClick={closeModal}
                className="bg-[white] p-1 rounded-2xl h-full ms-10"
              >
                <MdCancel
                  className={`max-[340px]:text-[1.3rem] text-2xl md:text-[2rem]`}
                />
              </button>
            </div>
          </div>

          <div className="border--2 border-[green] flex flex-col items-center">
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow--md">
              {order_status === "Aid_Avalaible" ? (
                <>
                  <Field
                    type="text"
                    name="price"
                    placeHolder={"Price"}
                    value={price}
                    onChange={handelChange}
                  />

                  <Field
                    placeHolder={"Description"}
                    type="textarea"
                    name={"description"}
                    value={description}
                    className={`mt-4`}
                    onChange={handelChange}
                  />
                </>
              ) : null}

              <select
                name="order_status"
                value={order_status}
                onChange={handelChange}
                className={`flex h-9 w-full mt-4 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring--1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1`}
              >
                <option> Select Medicine Status </option>
                <option value="Aid_Avalaible"> Aid Avalaible </option>
                <option value="Not_avalaible"> Not Avalaible </option>
              </select>

              <div className="border--2 border-purple-900 md:col-span-4 lg:col-span-5 flex items-center justify-center mt-5">
                <Button
                  name={"Submit Order"}
                  textColor={"text-white-color"}
                  bgcolor={"bg-primary-color"}
                  pClass={"w-fit justify-center"}
                  mainClass={`mt-4 w-[90%] md:mt-0 md:w-[10rem] rounded-lg p-2 active:scale-95`}
                  onClick={handelChangeStatusSubmit}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            {tableHead.map((item, i) => (
              <TableHead
                key={i + 4}
                className={`${item.className} ${text_color} min-w-fit`}
              >
                {item.head}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {pharmacy_table_data?.filter(item => item._id.slice(-4)?.toLowerCase()?.includes(searchQuery?.toLowerCase())).map((items, i) =>
            items.order_status[0] === "Pending" ||
            items.order_status[0] === "Aid_Avalaible" ||
            items.order_status[0] === "Not_Avalaible" ? (
              <React.Fragment key={i + 5}>
              {/* {console.log(items)} */}
                <TableRow
                  className={`${styles.tr_} border--2 border-green-900 p-3 text-[#787878]`}
                >
                  <TableCell className={`${items.className} text-center`}>
                    <abbr title={items._id}> {items._id.slice(-4)} </abbr>{" "}
                  </TableCell>
                  <TableCell className={`${items.className} text-center`}>
                    {items.user_id.name}
                  </TableCell>
                  <TableCell className={`${items.className} text-center`}>
                    {items.createdAt.split("T")[0]}
                  </TableCell>
                  <TableCell className={`${items.className} text-center`}>
                    {items.Order_type}
                  </TableCell>
                  <TableCell className={`${items.className} text-center`}>
                    {items.price}
                  </TableCell>
                  <TableCell className={`${items.className} text-center`}>
                    {items.order_status}
                  </TableCell>
                  <TableCell
                    className={`${items.className} text-center flex justify-center gap--3`}
                  >
                    {items.order_status[0] === "Pending" ? (
                      <>
                        <div className="border--2 border-purple-900 md:col-span-4 lg:col-span-5 flex items-center justify-center mt-[0.4rem]">
                          <Button
                            name={"Proceed"}
                            textColor={"text-white-color"}
                            bgcolor={"bg-primary-color"}
                            pClass={"w-fit justify-center"}
                            mainClass={`mt-4 w-[90%] md:mt-0 px-4 rounded-lg p-1 active:scale-95`}
                            onClick={() => (
                              setGetOrderID(items._id), setModalIsOpen(true)
                            )}
                          />
                        </div>
                      </>
                    ) : (
                      <Button
                        name={"Proceed"}
                        textColor={"text-white-color"}
                        bgcolor={"bg-slate-500"}
                        pClass={"w-fit justify-center items-center mt--[-1rem]"}
                        mainClass={`mt-4 w-[90%] md:mt-0 px-4 rounded-lg p-1 active:scale-95`}
                        className={"py-1 px-4 mt-[0.4rem]"}
                        disabled={true}
                      />
                    )}
                  </TableCell>
                  <TableCell className={`${items.className}`}>
                    <Link href={items.Prescription}>
                      {" "}
                      <div className="w-full flex justify-center">
                        {" "}
                        <SiReadthedocs className={`${text_color}`} />{" "}
                      </div>{" "}
                    </Link>{" "}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ) : (
              ""
            )
          )}
        </TableBody>
      </Table>
    </>
  );
}
