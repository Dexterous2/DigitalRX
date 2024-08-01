"use client"
import React, { useEffect, useState } from 'react'
import Button from '../../button/Button'
import { IoSearch } from 'react-icons/io5'
import Field from '@/components/inputFIeld/Field'
import ThreeDots from '@/components/ThreeDots/ThreeDots'

const PatientTable = ({ head, data, yHeight, tableHeading, func, isDot }) => {
    const [tableHead, setTableHead] = useState([])

    const dummyTableHead = [
        {
            head: "Pharmacies Name",
            isStart: true
        },
        {
            head: "Patients",
        },
        {
            head: "Completed Orders",
        },
        {
            head: "Joining Date",
            isStart: true
        },
        {
            head: "Status",
        },
    ]

    useEffect(() => {

        if (head) {
            setTableHead(head)
        } else {
            setTableHead(dummyTableHead)
        }
    }, [head, tableHead, data])

    const handleId = (id) => {
        console.log(id)
    }
    return (
        <div className='bg-white-color  box_shadow_sec rounded-xl w-full overflow-hidden '>
            <div className='flex py-4 px-8 justify-between items-center text-primary-color pb-4 sm:flex-row flex-col sm:gap-0 gap-4'>
                <h2>{tableHeading ? tableHeading : "Pharmacies Status"}</h2>
                <div className='flex'>
                    <span className='flex items-center gap-2 border-2 border-primary-color px-2 rounded-xl'>
                        <IoSearch size={32} className='text-primary-color' />
                        <Field type='text' placeHolder="Search" bgColor="bg-white-color" />
                    </span>
                    {isDot &&
                        <ThreeDots func={func} />
                    }
                </div>
            </div>
            <div className={`w-full max-[1400px]:overflow-x-auto max-[650px]:w-[90vw] max-[450px]:w-[88vw] ${yHeight ? `${yHeight} overflow-y-auto` : ""} `}>
                <table className='w-full max-[1400px]:w-[46rem] max-[1024px]:w-full max-[650px]:w-[50rem] '>
                    <thead className='px-4'>
                        <tr >
                            {tableHead?.map((item, i) => (
                                <th key={i} className={`text-primary-color ${item?.isStart ? "text-start" : "text-center"} py-2  
                        ${i === 0 ? "pl-8" : "pl-0"}
                        ${i === tableHead?.length - 1 ? "pr-8" : "pr-0"}`}>
                                    {item?.head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item, i) => (
                            <tr key={i} className='tableRow'>
                                {item && Object.keys(item).map((key, j) => (
                                    <>
                                        {

                                            (key !== 'id' && key !== "status") &&
                                            <td key={j} className={`py-2 ${j === 1 ? "pl-8 text-start" : "pl-0 text-center"}`}>
                                                {item[key]}
                                            </td>
                                        }
                                        {
                                            key === "status" &&
                                            <td className={` text-center py-2 pr-8`}>
                                                <Button
                                                    name={item?.status === "Active" ? "Unactive" : "Active"}
                                                    bgcolor="bg-primary-color" pClass="text-white-color" style={{ borderRadius: "50px", paddingInline: "10px", paddingBlock: "5px" }} onClick={() => handleId(item.id)} />
                                            </td>
                                        }
                                    </>
                                ))}
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PatientTable
