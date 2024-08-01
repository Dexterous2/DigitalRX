import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import styles from "@/components/Table/SimpleTable/SimpleTable.module.css";
import React from "react";

export function PatientOrderTable({ tableHead, patient_table_data, length_ }) {
  return (
    <>
      <Table>
        {
          length_ != 0 ?
            <>
              <TableHeader>
                <TableRow>
                  {tableHead.map((item, i) => (
                    < React.Fragment key={i + 2}>
                      <TableHead
                        className={`${item.className} text-[#DE8127] min-w-fit`}
                      >
                        {item.head}
                      </TableHead>
                    </ React.Fragment >

                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {patient_table_data?.map((items, i) => (
                  <React.Fragment key={i + 23}>
                    <TableRow
                      className={`${styles.tr_} border--2 border-green-900 p-3 text-[#787878]`}
                    >
                      <TableCell className={`${items.className} text-center`}>
                        <abbr title={items._id}> {items._id.slice(-4)} </abbr>{" "}
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
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </> :
            ''
        }

      </Table>
    </>
  );
}
