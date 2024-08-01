"use client"
import PharmacyLayout from '@/layout/PharmacyLayout/PharmacyLayout'
import Image from 'next/image'
import { IoIosMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { GoClockFill } from "react-icons/go";
import Button from '@/components/button/Button';
import { FaPlus } from "react-icons/fa6";
import LineChart from '@/components/LineChart/LineChart';
import { useParams, useRouter } from 'next/navigation';
import PharmacyTable from '@/components/Table/PharmacyTable/PharmacyTable';
import { useGetPharmacyStatusQuery, usePharmacyProfileDataQuery, usePharmacyUsersQuery, useUpdatePharmacyStatusMutation } from '@/Redux/PharmacyAuthSlice/PharmacyAuthSlice';
import { getCookie } from 'cookies-next';
import { useGetOrdersByPharmacyQuery } from '@/Redux/OrderSlice/OrderSlice';
import { useEffect, useState } from 'react';
import OrdersSkeleton from '@/components/skeleton/orders/OrdersSkeleton';
import ResponseToast from '@/components/toast/Toast';

const page = () => {
    const [filterOrder, setFilterOrder] = useState("")
    const [orderData, setOrderData] = useState([])
    const router = useRouter()

    const TableHead = [
        {
            head: "Patient Name",
            isStart: true
        },
        {
            head: "Refills"
        },
        {
            head: "Order Type",
        },
        {
            head: "Order Date",
        },

    ]

    const getData = getCookie("digitalrx")
        ? JSON?.parse(getCookie("digitalrx"))
        : getCookie("digitalrx");
    const role = getData?.role[0];
    const userID = getData?._id

    const handleNavigate = (id) => {
        router.push(`/orders/${id}`)
    }

    const { id } = useParams()
    // Get Pharmacy Profile
    const getPharmacyProfile = usePharmacyProfileDataQuery(id, { skip: !id })
    const getPharmacyProfileData = getPharmacyProfile?.data?.findUser

    // Get Pharmacies All Patients
    const getAllPatients = usePharmacyUsersQuery({ userID: getPharmacyProfileData?._id }, { skip: !getPharmacyProfileData?._id })
    const getAllPatientsData = getAllPatients?.data?.users?.length

    // Get All Pharmacies Orders
    const getAllPharmaciesOrders = useGetOrdersByPharmacyQuery(getPharmacyProfileData?._id, { skip: !getPharmacyProfileData?._id })
    const getAllPharmaciesOrdersData = getAllPharmaciesOrders?.data?.orders
    const getPharmacyOrdersLoading = getAllPharmaciesOrders?.isLoading

    // Convert Data 
    const convertData = (originalData) => {
        const data = originalData?.filter(item => item?.user_id?.name?.toLowerCase()?.includes(filterOrder?.toLowerCase()))?.map(item => {
            return {
                id: item?._id,
                Order_by: item?.user_id?.name,
                Refills: "12",
                Order_Type: item?.Order_type?.[0],
                transaction_date: new Date(item?.createdAt)?.toLocaleDateString('en-US'),
            };
        });
        setOrderData(data)
    };

    useEffect(() => {
        convertData(getAllPharmaciesOrdersData)
    }, [getAllPharmaciesOrders, filterOrder])

    const handleGetStatus = () => {

    }

    // Active And In Active API
    const [updateStatus] = useUpdatePharmacyStatusMutation()

    // Handle Active And In Active API
    const handleStatusUpdate = async (e) => {
        try {
            const res = await updateStatus({
                userID: userID,
                pharmacyID: id,
                data: { status: e.target.value }
            })
            ResponseToast({ res })
        } catch (error) {
            ResponseToast({ message: "Error updating status" })
        }
    }

    // Get Pharmacy Status
    const getPharmacyStatus = useGetPharmacyStatusQuery(id, { skip: !id })
    const getPharmacyStatusData = getPharmacyStatus?.data?.status[0]

    return (
        <PharmacyLayout isSearch={false}>
            <div className='flex flex-col gap-8'>
                {/* Pharmacy First Section */}
                <div className='flex w-full justify-between xl:flex-row flex-col xl:gap-0 gap-4'>
                    <div className='flex sm:gap-4 gap-2 md:flex-row flex-col md:items-start items-center'>
                        <img src={getPharmacyProfileData?.profileImg} width={300} height={300} alt='Pharmacy profile' className='w-[10rem] h-[10rem] rounded-xl' />
                        <div className='py-2 flex flex-col sm:gap-6 gap-2'>
                            <span className='flex gap-2 items-center sm:flex-row flex-col'>
                                <h2 className='text-primary-color'>Sunrise Pharmacy</h2>
                                <div className='rounded-[50px] outline-none text-white-color bg-primary-color'>
                                    <select className='py-1 px-3' value={getPharmacyStatusData} onChange={handleStatusUpdate}>
                                        <option value="Active" className='px-4'>Active</option>
                                        <option value="Inactive" className='px-4'>In Active</option>
                                    </select>
                                </div>
                            </span>
                            <span className='h-full flex flex-col justify-between'>
                                <p className='flex gap-2 items-center text-[#969696]'>
                                    <IoIosMail className='text-primary-color' />
                                    {getPharmacyProfileData?.Buisness_email}</p>
                                <p className='flex gap-2 items-center text-[#969696]'>
                                    <FaPhoneAlt className='text-primary-color' />
                                    {getPharmacyProfileData?.phone_number}</p>
                                <p className='flex gap-2 items-center text-[#969696]'>
                                    <MdHome className='text-primary-color' />
                                    {getPharmacyProfileData?.address}</p>
                                <p className='flex gap-2 items-center text-[#969696]'>
                                    <GoClockFill className='text-primary-color' />
                                    Subscriptions ends on 18 Jan 2025</p>
                            </span>
                        </div>
                    </div>
                    {role === "pharmacy" ?
                        <div className='flex gap-4 xl:flex-col sm:flex-row flex-col md:justify-start justify-center'>
                            <Button name="Edit Subscription" icon={<FaPlus />} bgcolor="bg-primary-color" textColor="text-white-color" style={{ width: "fit-content", borderRadius: "50px", paddingInline: "1rem" }} />
                            <Button name="Edit Profile" icon={<FaPlus />} bgcolor="bg-primary-color" textColor="text-white-color" style={{ width: "fit-content", borderRadius: "50px", paddingInline: "1rem" }} />
                        </div> : null
                    }
                </div>

                {/* Pharmacy Second Section */}

                <div className='grid gap-4 xl:grid-cols-2 items-center'>

                    <div className='flex flex-col gap-4'>
                        <h2 className='text-primary-color'>Bio</h2>
                        <p className='leading-7 2xl:pr-24 pr-0 '>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                        </p>
                    </div>

                    <div className='w-full bg-primary-color sm:p-4 py-4 px-0 h-[20rem] rounded-xl overflow-hidden box_shadow_sec'>
                        <div className='flex sm:flex-row flex-col sm:gap-0 gap-4 justify-between items-center py-4 px-8'>
                            <h2 className='capitalize text-white-color'>patient’s Charts</h2>
                            <select className='p-2 rounded-[50px] outline-none text-primary-color'>
                                <option value="this_month">This Month</option>
                                <option value="this_week">This Week</option>
                            </select>
                        </div>
                        <div className='h-[13rem]'>
                            <LineChart />
                        </div>
                    </div>
                </div>

                {/* Pharmacy Third Section */}
                <div className='grid grid-cols-4 gap-4 '>
                    <div className='bg-primary-color p-4 rounded-xl box_shadow_sec flex flex-col gap-4 items-center justify-center xl:col-span-1 col-span-4'>
                        <div className='flex flex-col gap-2 w-full'>
                            <div className='flex justify-between '>
                                <span className='text-white-color'>
                                    <h1>{getAllPatientsData}</h1>
                                    <p>Total Clients</p>
                                </span>
                                <img src="/image/main/two-user.png" alt="no img found" />
                            </div>
                            <p className='text-white-color'>+8% from yesterday</p>
                        </div>
                        <Button name="View All" style={{ width: "fit-content", borderRadius: "50px", paddingInline: "1rem" }} onClick={() => router.push(`/pharmacy/pharmacy-patients/${id}`)} />
                    </div>
                    <div className='xl:col-span-3 h-[15rem] overflow-y-hidden col-span-4'>
                        {getPharmacyOrdersLoading ?
                            <OrdersSkeleton />
                            :
                            <PharmacyTable head={TableHead} data={orderData} yHeight="h-[10rem]" tableHeading="Pharmacies Orders" func={() => handleNavigate(id)} isDot filterOrder={filterOrder}
                                setFilterOrder={setFilterOrder} />
                        }
                    </div>
                </div>
            </div>
        </PharmacyLayout>
    )
}

export default page
