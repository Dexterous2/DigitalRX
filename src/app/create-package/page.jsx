'use client'

import Button from '@/components/button/Button'
import { TableCard } from '@/components/card/card'
import Field from '@/components/inputFIeld/Field'
import DashboardLayout from '@/layout/DLayout/DashboardLayout'
import React, { useEffect, useState } from 'react'
import { columns_packages } from '@/components/dataTable/columns'
import { useCreateSubscriptionMutation, useGetSubscriptionQuery, useUpdateSubscriptionStatusMutation } from '@/Redux/subscriptionSlice/SubscriptionSlice'
import ResponseToast from '@/components/toast/Toast'
import styles from '@/components/Table/SimpleTable/SimpleTable.module.css'
import { MdCancel } from 'react-icons/md'

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useSearch } from '../SearchContext'
import ModalComp from '@/components/modal/Modal'
import { getCookie } from 'cookies-next'
import { MdDeleteForever } from "react-icons/md";
import { AlertDialogEdit } from '@/components/dialogEditPkg/dialogEditPkg'
import { FaEdit } from "react-icons/fa";
import { useSelector } from 'react-redux'

const page = () => {

    const [pkgID, setPkgID] = useState('')
    const [sendPkgId, setSendPkgID] = useState('');

    const userID = JSON.parse(getCookie('digitalrx'))?._id;

    const [table_data, setTableData] = useState([])

    const { searchQuery } = useSearch()

    const tableHead = [
        {
            head: 'ID',
            className: 'w-fit text-center',
        },
        {
            head: 'Title',
            className: 'w-fit text-center',
        },
        {
            head: 'Price',
            className: 'w-fit text-center',
        },
        {
            head: 'Duration',
            className: 'w-fit text-center',
        },
        {
            head: 'Description',
            className: 'w-fit text-center',
        },
        {
            head: 'Status',
            className: 'w-fit text-center',
        },
        {
            head: 'Action',
            className: 'w-fit text-center',
        },
        {
            head: '',
            className: 'w-fit text-center',
        },
        {
            head: '',
            className: 'w-fit text-center',
        },
    ]

    const [pkg, setPkg] = useState({
        title: '',
        price: '',
        description: '',
        duration: '',
    })

    const { title, price, description, duration } = pkg
    const handelChange = (e) => {
        setPkg({ ...pkg, [e.target.name]: e.target.value })
    }

    // create pkg api
    const [createPkg, { isLoading }] = useCreateSubscriptionMutation()
    const handelSubmit = async () => {
        try {
            const res = await createPkg(pkg)
            ResponseToast({ res })
            console.log(res);
            if (!res?.error) {
                setPkg({
                    title: '',
                    price: '',
                    description: '',
                    duration: ''
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    // get pkg api
    const { data } = useGetSubscriptionQuery()
    useEffect(() => {
        setTableData(data?.subscriptions)
    }, [data])
    // console.log(table_data)

    // update pkg api
    const [updatePkg, { isLoading: getUpdateLoading }] = useUpdateSubscriptionStatusMutation();
    const handelUpdateSubmit = async (PkgID, Pkgstatus) => {
        setPkgID(PkgID)
        // console.log(PkgID);
        try {
            const res = await updatePkg({ user_id: userID, package_id: PkgID, data: { status: Pkgstatus } });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const handelClickDialog = (pkgID_) => {
        setSendPkgID(pkgID_)
    }

    const text_color = useSelector((state) => state.theme.text_color);

    return (
        <DashboardLayout>
            <div className='bg-white rounded-xl box_shadow_sec w-full h-fit p-4'>
                <h1 className={`p-4 text-4xl font-medium ${text_color} pt-14`}> Create Packages </h1>

                <div className='rw_2 border--2 border-red-600 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-5 mb-0 p-4'>
                    <div className='md:col-span-2 lg:col-span-2'>
                        <h4 className={`${text_color} text-xl md:text-2xl font-semibold`}> Package Details </h4>
                    </div>

                    <div>
                        <label htmlFor='' className={text_color}>
                            Title
                        </label>
                        <Field placeHolder='Title' name={'title'} value={title} onChange={handelChange} />
                    </div>
                    <div>
                        <label htmlFor='' className={text_color}>
                            Price
                        </label>
                        <Field placeHolder='Price' name={'price'} value={price} onChange={handelChange} />
                    </div>
                    <div>
                        <label htmlFor='' className={text_color}>
                            Duration
                        </label>
                        <Field placeHolder='Duration' name={'duration'} value={duration} onChange={handelChange} />
                    </div>
                    <div>
                        <label htmlFor='' className={text_color}>
                            Description
                        </label>
                        <Field type='textarea' row={2} placeHolder='Description' name={'description'} value={description} onChange={handelChange} />
                    </div>
                </div>

                <div className={`row_1 w-full border--2 border-red-900 p-4`}>
                    <div className='border--2 border-purple-900 flex items-center justify-center md:justify-end'>
                        <Button name={'Add'} textColor={'text-white-color'} bgcolor={'bg-primary-color'} pClass={'w-fit justify-center'} mainClass={`mt-4 w-[90%] md:mt-0 md:w-[10rem] rounded-lg p-2 active:scale-95`} onClick={handelSubmit} isLoading={isLoading} />
                    </div>
                </div>
            </div>

            <div className='mt-6 bg-white rounded-xl box_shadow_sec w-full h-[39vh] p-4'>
                <Table>
                    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                    <TableHeader>
                        <TableRow>
                            {tableHead.map((item, i) => (
                                <TableHead key={i} className={`${item.className} ${text_color} min-w-fit`}>
                                    {item.head}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {table_data
                            ?.filter((item) => item._id.slice(-4)?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
                            .map((items) => (
                                <React.Fragment key={items._id}>
                                    <TableRow key={items._id} className={`${styles.tr_} border--2 border-green-900 p-3 text-[#787878]`}>
                                        <TableCell className={`${items.className} text-center`}>
                                            <abbr title={items._id}> {items._id.slice(-4)} </abbr>{' '}
                                        </TableCell>
                                        <TableCell className={`${items.className} text-center`}>{items.title}</TableCell>
                                        <TableCell className={`${items.className} text-center`}>{items.price}</TableCell>
                                        <TableCell className={`${items.className} text-center`}>{items.duration}</TableCell>
                                        <TableCell className={`${items.className} text-center`}>{items.description}</TableCell>
                                        <TableCell className={`${items.className} text-center`}>{items?.status[0]}</TableCell>
                                        <TableCell className={`${items.className} text-center flex justify-center gap--3`}>
                                            {items?.status[0] === 'Active' ? (
                                                <>
                                                    <div className='border--2 border-purple-900 md:col-span-4 lg:col-span-5 flex items-center justify-center mt-[0.4rem]'>
                                                        <Button name={'Disabled'} textColor={'text-white-color'} bgcolor={'bg-primary-color'} pClass={'w-fit justify-center'} mainClass={`mt-4 w-[90%] md:mt-0 px-4 rounded-lg p-1 active:scale-95`} isLoading={pkgID === items._id ? getUpdateLoading : ''} onClick={() => handelUpdateSubmit(items._id, 'Disabled')} />
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className='border--2 border-purple-900 md:col-span-4 lg:col-span-5 flex items-center justify-center mt-[0.4rem]'>
                                                        <Button name={'Active'} textColor={'text-white-color'} bgcolor={'bg-primary-color'} pClass={'w-fit justify-center'} mainClass={`mt-4 w-[100%] md:mt-0 px-4 rounded-lg p-1 active:scale-95`} isLoading={pkgID === items._id ? getUpdateLoading : ''} onClick={() => handelUpdateSubmit(items._id, 'Active')} />
                                                    </div>
                                                </>
                                            )}
                                        </TableCell>
                                        <TableCell className={`${items.className} text-center cursor-pointer`}>  <div onClick={() => handelClickDialog(items)}> {<AlertDialogEdit item={sendPkgId} icon={<FaEdit className='text-xl text--[red]' />} />} </div> </TableCell>
                                        <TableCell className={`${items.className} text-center cursor-pointer`}>{<div onClick={() => handelUpdateSubmit(items._id, 'Delete')}> <MdDeleteForever className='text-2xl text-[red]' /> </div>}</TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))}
                    </TableBody>
                </Table>
            </div>
        </DashboardLayout>
    )
}

export default page
