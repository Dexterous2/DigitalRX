'use client'

import Button from '@/components/button/Button'
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

const TableSkeleton = ({className}) => {
    return (

        <>
            <Table className={className}>
                <TableHeader>
                    <TableRow>
                        { Array.from({length: 8}).map((item, i) => (
                            <TableHead key={i} className={`text-[#DE8127] min-w-fit`}>
                                <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-11 mb-4'></div> 
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                                <>
                                    <TableRow className={`border--2 border-green-900 p-3 text-[#787878]`}>
                                        <TableCell className={`text-center`}>
                                            <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-11 mb-4'></div> 
                                        </TableCell>
                                        <TableCell className={`text-center`}><div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-11 mb-4'></div> </TableCell>
                                        <TableCell className={`text-center`}><div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-11 mb-4'></div> </TableCell>
                                        <TableCell className={`text-center`}><div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-11 mb-4'></div> </TableCell>
                                        <TableCell className={`text-center`}><div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-11 mb-4'></div> </TableCell>
                                        <TableCell className={`text-center`}><div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-11 mb-4'></div> </TableCell>
                                        <TableCell className={`text-center`}>
                                        <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-11 mb-4'></div>
                                        </TableCell>
                                        <TableCell className={`text-center`}>
                                            <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-11 mb-4'></div>
                                        </TableCell>
                                    </TableRow>
                                </>
                </TableBody>
            </Table>
        </>
    )
}

export default TableSkeleton
