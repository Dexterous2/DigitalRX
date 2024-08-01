"use client";
import { TablePri } from "@/components/Table/SimpleTable/SimpleTable";
import PharmacyLayout from "@/layout/PharmacyLayout/PharmacyLayout";
import React, { useEffect, useState } from "react";
import { SiReadthedocs } from "react-icons/si";

import { useGetOrdersByPharmacyQuery } from "@/Redux/OrderSlice/OrderSlice";
import { getCookie } from "cookies-next";
import { MdOutlineBrowserNotSupported } from "react-icons/md";
import TableSkeleton from "@/components/skeleton/tables/TableSkeleton";
import { useSelector } from "react-redux";

const page = () => {
  const [tableData, setTableData] = useState([]);

  const text_color = useSelector((state) => state.theme.text_color);

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

  const filterData = data?.orders?.filter(
    (item) => item.order_status[0] === "Completed"
  );

  useEffect(() => {
    setTableData(filterData);
  }, [data]);

  return (
    <PharmacyLayout isReference headingName={"Completed Orders"}>
      <div className="bg-white rounded-xl w-full h-fit">
        {tableData?.length <= 0 ? (
          <div className="border--2 border-[red] w-full h-[50vh] flex gap-2 justify-center items-center ">
            <MdOutlineBrowserNotSupported className={`${text_color} text-3xl`} />
            <h2 className={`${text_color}`}>No Data Yet</h2>
          </div>
        ) : (
          getTableSkeleton ?
            Array.from({length: 5}).map(( item_, i )=> <TableSkeleton key={i} /> )
            :
          <TablePri tableHead={tableHead} pharmacy_table_data={tableData} />
        )}
      </div>
    </PharmacyLayout>
  );
};

export default page;
