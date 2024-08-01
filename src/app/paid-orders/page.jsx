"use client";
import { TablePri } from "@/components/Table/SimpleTable/SimpleTable";
import PharmacyLayout from "@/layout/PharmacyLayout/PharmacyLayout";
import React, { useEffect, useState } from "react";
import { SiReadthedocs } from "react-icons/si";

import { useGetOrdersByPharmacyQuery } from "@/Redux/OrderSlice/OrderSlice";
import { getCookie } from "cookies-next";
import { SelectBox } from "@/components/select/selectBox";
import { MdOutlineBrowserNotSupported } from "react-icons/md";
import TableSkeleton from "@/components/skeleton/tables/TableSkeleton";
import { useSelector } from "react-redux";

const page = () => {
  const [tableData, setTableData] = useState([]);

  const text_color = useSelector((state) => state.theme.text_color);
    const bg_color = useSelector((state) => state.theme.bg_color);

  const getData = getCookie("digitalrx")
    ? JSON?.parse(getCookie("digitalrx"))
    : getCookie("digitalrx");
  const pharmacyID = getData?._id;

  const { data, isLoading: getTableSkeleton } = useGetOrdersByPharmacyQuery(pharmacyID, {
    skip: !pharmacyID,
  });

  const tableHead = [
    {
      head: "Order ID",
      className: "w-fit text-center",
    },
    {
      head: "Patient Name",
      className: "w-fit text-center",
    },
    {
      head: "Request Date",
      className: "w-fit text-center",
    },
    {
      head: "Order Type",
      className: "w-fit text-center",
    },
    {
      head: "Payment",
      className: "w-fit text-center",
    },
    {
      head: "Order Status",
      className: "w-fit text-center",
    },
    {
      head: "Action",
      className: "w-fit text-center",
    },
    {
      head: "Prescription",
      className: "w-fit text-center",
    },
  ];

  const pharmacy_table_data = [
    {
      id: 1,
      orderID: "6004",
      patientsName: "Chris Wayne",
      requestDate: "6 Feb 2023",
      category: "New",
      payment: "Received",
      orderStatus: (
        <p className={`${bg_color} text-[#fff] text-sm p-1 rounded-full`}>
          Completed
        </p>
      ),
      prescription: (
        <div className="w-full flex justify-center">
          {" "}
          <SiReadthedocs className={text_color} />{" "}
        </div>
      ),
      className: `w-fit text-center`,
    },
    {
      id: 2,
      orderID: "6004",
      patientsName: "Chris Wayne",
      requestDate: "6 Feb 2023",
      category: "New",
      payment: "Received",
      orderStatus: (
        <p className={`${bg_color} text-[#fff] text-sm p-1 rounded-full`}>
          Completed
        </p>
      ),
      prescription: (
        <div className="w-full flex justify-center">
          {" "}
          <SiReadthedocs className={text_color} />{" "}
        </div>
      ),
      className: `w-fit text-center`,
    },
    {
      id: 3,
      orderID: "6004",
      patientsName: "Chris Wayne",
      requestDate: "6 Feb 2023",
      category: "New",
      payment: "Received",
      orderStatus: (
        <p className={`${bg_color} text-[#fff] text-sm p-1 rounded-full`}>
          Completed
        </p>
      ),
      prescription: (
        <div className="w-full flex justify-center">
          {" "}
          <SiReadthedocs className={text_color} />{" "}
        </div>
      ),
      className: `w-fit text-center`,
    },
    {
      id: 4,
      orderID: "6004",
      patientsName: "Chris Wayne",
      requestDate: "6 Feb 2023",
      category: "New",
      payment: "Received",
      orderStatus: (
        <p className={`${bg_color} text-[#fff] text-sm p-1 rounded-full`}>
          Completed
        </p>
      ),
      prescription: (
        <div className="w-full flex justify-center">
          {" "}
          <SiReadthedocs className={text_color} />{" "}
        </div>
      ),
      className: `w-fit text-center`,
    },
    {
      id: 5,
      orderID: "6004",
      patientsName: "Chris Wayne",
      requestDate: "6 Feb 2023",
      category: "New",
      payment: "Received",
      orderStatus: (
        <p className={`${bg_color} text-[#fff] text-sm p-1 rounded-full`}>
          Completed
        </p>
      ),
      prescription: (
        <div className="w-full flex justify-center">
          {" "}
          <SiReadthedocs className={text_color} />{" "}
        </div>
      ),
      className: `w-fit text-center`,
    },
    {
      id: 6,
      orderID: "6004",
      patientsName: "Chris Wayne",
      requestDate: "6 Feb 2023",
      category: "New",
      payment: "Received",
      orderStatus: (
        <p className={`${bg_color} text-[#fff] text-sm p-1 rounded-full`}>
          Completed
        </p>
      ),
      prescription: (
        <div className="w-full flex justify-center">
          {" "}
          <SiReadthedocs className={text_color} />{" "}
        </div>
      ),
      className: `w-fit text-center`,
    },
    {
      id: 7,
      orderID: "6004",
      patientsName: "Chris Wayne",
      requestDate: "6 Feb 2023",
      category: "New",
      payment: "Received",
      orderStatus: (
        <p className={`border-2 border-[#DE8127] bg-[#fff] ${text_color} text-sm p-1 rounded-full`}>
          Pending
        </p>
      ),
      prescription: (
        <div className="w-full flex justify-center">
          {" "}
          <SiReadthedocs className={text_color} />{" "}
        </div>
      ),
      className: `w-fit text-center`,
    },
    {
      id: 8,
      orderID: "6004",
      patientsName: "Chris Wayne",
      requestDate: "6 Feb 2023",
      category: "New",
      payment: "Received",
      orderStatus: (
        <p className={`${bg_color} text-[#fff] text-sm p-1 rounded-full`}>
          Completed
        </p>
      ),
      prescription: (
        <div className="w-full flex justify-center">
          {" "}
          <SiReadthedocs className={text_color} />{" "}
        </div>
      ),
      className: `w-fit text-center`,
    },
  ];
  const filterData = data?.orders?.filter(
    (item) =>
      item?.order_status[0] === "Dispatched" ||
      item?.order_status[0] === "Paid" ||
      item?.order_status[0] === "Delivered"
  );
  useEffect(() => {
    setTableData(filterData);
  }, [data]);

  return (
    <PharmacyLayout isReference headingName={"Paid Orders"}>
      <div className="bg-white rounded-xl w-full h-fit">
        {tableData?.length <= 0 ? (
          <div className="border--2 border-[red] w-full h-full flex flex-col justify-center items-center">
            <MdOutlineBrowserNotSupported className="text-[#de8327ad] text-3xl" />
            <h2 className="text-[#de8327ad]">No Data Yet</h2>
          </div>
        ) : (
          getTableSkeleton ?
            Array.from({length: 5}).map(( item_, i )=> <TableSkeleton key={i} />)
          :
          <TablePri tableHead={tableHead} pharmacy_table_data={tableData} />
        )}
      </div>
    </PharmacyLayout>
  );
};

export default page;
