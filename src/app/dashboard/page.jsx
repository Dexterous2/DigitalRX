'use client'

import React, { Suspense, useEffect, useState } from 'react'
import DashboardLayout from '@/layout/DLayout/DashboardLayout'

import { MdAccountBalanceWallet } from 'react-icons/md'
import { FaUserGroup } from 'react-icons/fa6'
import { GiBeachBag } from 'react-icons/gi'
import { FaShop } from 'react-icons/fa6'

// import { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { AreaChart, Area } from 'recharts'
import { PieChart, Pie, Sector, Cell } from 'recharts'

// ////////////////////////////////////////////
import Card from '@/components/card/card'
import DashTable from '@/components/Table/DashTable/DashTable'
import { useGetAllPharmaciesQuery, useGetPharmacyDataQuery, usePharmacyUsersQuery } from '@/Redux/PharmacyAuthSlice/PharmacyAuthSlice'
import { useGetAllOrdersAdminQuery, useGetOrdersByPharmacyQuery } from '@/Redux/OrderSlice/OrderSlice'
import { getCookie } from 'cookies-next'
import { useSelector } from 'react-redux'
import DashboardSkeleton from '@/components/skeleton/dashboard/DashboardSkeleton'
import { useGetAllUserProfileQuery } from '@/Redux/AuthSlice/AuthSlice'
import Loader from '@/components/pageLoader/loader'

const CustomBar = (props) => {
    const { x, y, height, fill } = props

    // Customize the border radius here
    const borderRadius = 10

    return (
        <g>
            <rect x={x} y={y} width={25} height={height} fill={fill} rx={borderRadius} />
        </g>
    )
}

const page = () => {
    const text_color = useSelector((state) => state.theme.text_color)
    const bg_color = useSelector((state) => state.theme.bg_color)

    const [adminTableData, setAdminTableData] = useState([])
    const [userTableData, setUserTableData] = useState([])

    // barchart ///////////////////////////////
    // ///////////////////////////////////////
    const data = [
        {
            name: 'Week 1',
            amt: 1000,
        },
        {
            name: 'Week 2',
            amt: 800,
        },
        {
            name: 'Week 3',
            amt: 500,
        },
        {
            name: 'Week 4',
            amt: 200,
        },
    ]
    // ///////////////////////////////////////
    // //////////////////////////////////////

    // Areachart ///////////////////////////////
    // ///////////////////////////////////////
    const data_area_chart = [
        {
            name: 'Jan',
            uv: 1000,
            amt: 0,
        },
        {
            name: 'Feb',
            uv: 800,
            amt: 100,
        },
        {
            name: 'Mar',
            uv: 600,
            amt: 400,
        },
        {
            name: 'Apr',
            uv: 500,
            amt: 300,
        },
        {
            name: 'May',
            uv: 300,
            amt: 50,
        },
        {
            name: 'Jun',
            uv: 30,
            amt: 500,
        },
    ]
    // ///////////////////////////////////////
    // //////////////////////////////////////

    // pie chart ///////////////////////////////
    // ///////////////////////////////////////
    const data_pie = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        // { name: 'Group D', value: 200 },
    ]

    const COLORS = ['#A35000', '#F6B575', '#FFF']
    const RADIAN = Math.PI / 180
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5
        const x = cx + radius * Math.cos(-midAngle * RADIAN)
        const y = cy + radius * Math.sin(-midAngle * RADIAN)

        return (
            <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        )
    }
    // ///////////////////////////////////////
    // //////////////////////////////////////

    const TableHead = [
        {
            head: 'Pharmacies Name',
            isStart: true,
        },
        {
            head: 'Clients',
        },
        {
            head: 'Orders',
        },
        {
            head: 'Joining Date',
        },

        // {
        //     head: 'Action',
        // },
    ]

    const tableData = [
        {
            id: '321321321321',
            pharmacyName: 'Sunrise Pharmacy',
            patients: '2k+',
            prescriptions: '6000+',
            date: '6 Feb 2023',
            status: 'Active',
        },
        {
            id: '18646158486',
            pharmacyName: 'Sunrise Pharmacy',
            patients: '2k+',
            prescriptions: '6000+',
            date: '6 Feb 2023',
            status: 'Unactive',
        },
        {
            id: '18646158486',
            pharmacyName: 'Sunrise Pharmacy',
            patients: '2k+',
            prescriptions: '6000+',
            date: '6 Feb 2023',
            status: 'Unactive',
        },
        {
            id: '18646158486',
            pharmacyName: 'Sunrise Pharmacy',
            patients: '2k+',
            prescriptions: '6000+',
            date: '6 Feb 2023',
            status: 'Unactive',
        },
        {
            id: '18646158486',
            pharmacyName: 'Sunrise Pharmacy',
            patients: '2k+',
            prescriptions: '6000+',
            date: '6 Feb 2023',
            status: 'Unactive',
        },
        {
            id: '18646158486',
            pharmacyName: 'Sunrise Pharmacy',
            patients: '2k+',
            prescriptions: '6000+',
            date: '6 Feb 2023',
            status: 'Unactive',
        },
        {
            id: '18646158486',
            pharmacyName: 'Sunrise Pharmacy',
            patients: '2k+',
            prescriptions: '6000+',
            date: '6 Feb 2023',
            status: 'Unactive',
        },
        {
            id: '18646158486',
            pharmacyName: 'Sunrise Pharmacy',
            patients: '2k+',
            prescriptions: '6000+',
            date: '6 Feb 2023',
            status: 'Unactive',
        },
        {
            id: '18646158486',
            pharmacyName: 'Sunrise Pharmacy',
            patients: '2k+',
            prescriptions: '6000+',
            date: '6 Feb 2023',
            status: 'Unactive',
        },
        {
            id: '18646158486',
            pharmacyName: 'Sunrise Pharmacy',
            patients: '2k+',
            prescriptions: '6000+',
            date: '6 Feb 2023',
            status: 'Unactive',
        },
    ]

    const pharmacy_table_head = [
        {
            head: 'Patients Name',
            isStart: true,
        },
        {
            head: 'Order Type',
        }
        // ,
        // {
        //     head: 'Payment',
        // }
        ,
        {
            head: 'Request Date',
            isStart: false,
        },
        {
            head: 'Status',
        },
    ]

    const pharmacy_table_data = [
        {
            id: 1,
            patientsName: 'Alfred Smith',
            category: 'Refill',
            payment: 'Received',
            requestDate: '6 Feb 2023',
            status: 'Pending',
        },
        {
            id: 2,
            patientsName: 'Alfred Smith',
            category: 'Refill',
            payment: 'Received',
            requestDate: '6 Feb 2023',
            status: 'Pending',
        },
        {
            id: 3,
            patientsName: 'Alfred Smith',
            category: 'Refill',
            payment: 'Received',
            requestDate: '6 Feb 2023',
            status: 'Pending',
        },
        {
            id: 4,
            patientsName: 'Alfred Smith',
            category: 'Refill',
            payment: 'Received',
            requestDate: '6 Feb 2023',
            status: 'Complete',
        },
    ]

    // num of pharmacies
    const pharma_data = useGetAllPharmaciesQuery()
    const num_of_pharmacy = pharma_data?.data?.length

    // num of completed orders
    const [orderData, setOrderData] = useState([])
    const num_of_completed_orders = orderData?.length

    const getData = getCookie('digitalrx') ? JSON?.parse(getCookie('digitalrx')) : getCookie('digitalrx')
    const userRoll = getData?.role[0]
    const pharmacyID = getData?._id
    const { data: order_data, isLoading: getTableSkeleton } = useGetOrdersByPharmacyQuery(pharmacyID, {
        skip: !pharmacyID,
    })
    const filterData = order_data?.orders?.filter((item) => item.order_status[0] === 'Completed')
    useEffect(() => {
        setOrderData(filterData)
    }, [order_data])

    // total orders
    const num_of_all_requested_orders = order_data?.orders?.length

    // number of total patients
    const patients_data = usePharmacyUsersQuery({ userID: pharmacyID })
    const num_of_total_patients = patients_data?.data?.users?.length

    // console.log(patients_data?.data?.users?.length);

    // number of total clients
    const clients_data = useGetAllUserProfileQuery(pharmacyID)
    const num_of_total_clients = clients_data?.data?.allusers?.length

    // total num of all oders
    const orders_data = useGetAllOrdersAdminQuery(pharmacyID)
    const num_of_total_orders = orders_data?.data?.Allorders?.length

    // table data for admin
    const admin_data = useGetPharmacyDataQuery()
    const table_admin_data = admin_data?.data?.data
    // console.log(table_admin_data?.data?.data);

    const manipulateTableData = (table_admin_data) => {
        const data = table_admin_data?.map((item) => {
            return {
                id: item?._id,
                pharmacyName: item?.name,
                clients: item?.users?.length,
                order: item?.orders?.length,
                joiningDate: item?.createdAt === null ? null : item?.createdAt,
            }
        })
        setAdminTableData(data)
    }

    useEffect(() => {
        manipulateTableData(table_admin_data)
    }, [admin_data])


    // table data for pharmacy
    const manipulateTableData_user = (order_data) => {
        const data = order_data?.map((item) => {
            return {
                id: item?._id,
                patientsName: item?.user_id?.name,
                orderType: item?.Order_type?.[0],
                requestDate: item?.createdAt?.split('T')[0],
                status: item?.Pharmacy_id?.status?.[0],
            }
        })
        setUserTableData(data)
    }

    useEffect(() => {
        manipulateTableData_user(order_data?.orders)
    }, [order_data])

    // console.log(order_data?.orders)
    // console.log(userTableData)

    // setAdminTableData()

    // console.log(clients_data?.data?.allusers?.length)

    return (
        <DashboardLayout>
            {userRoll === 'pharmacy' ? (
                getTableSkeleton ? (
                    <>
                        <DashboardSkeleton />
                    </>
                ) : (
                    <div className='relative'>
                        {/* <Loader /> */}

                        {/* cards warap*/}
                        <div className={`bg-white box_shadow_sec rounded-xl h-fit`}>
                            <div className='p-4 pb-1'>
                                <h2 className={`mb-2 ${text_color} w-full`}>Today's Reports</h2>
                                <small className='text-slate-500'> sales summary </small>
                            </div>
                            <div className={`row_1 border--2 border-blue-900 rounded-xl p-4 w-full h--[15rem] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 overflow-auto`}>
                                <Card title={num_of_total_patients} desc='Total Patients' percent_text_color='text-white' rev_percent='+8%' past_days='from yesterday' icon={<FaShop className='text-4xl md:text-5xl lg:text-5xl xl:text-7xl text-white' />} />
                                <Card title='4K' desc='Total Revenue' percent_text_color='text-white' rev_percent='+8%' past_days='from yesterday' icon={<MdAccountBalanceWallet className='text-4xl md:text-5xl lg:text-5xl xl:text-7xl text-white' />} />
                                <Card title={num_of_completed_orders} desc='Completed Orders' percent_text_color='text-white' rev_percent='+8%' past_days='from yesterday' icon={<GiBeachBag className='text-4xl md:text-5xl lg:text-5xl xl:text-7xl text-white' />} />
                                <Card title={num_of_all_requested_orders} desc='Order Requests' percent_text_color='text-white' rev_percent='+8%' past_days='from yesterday' icon={<GiBeachBag className='text-4xl md:text-5xl lg:text-5xl xl:text-7xl text-white' />} />
                            </div>
                        </div>

                        {/* charts and tables */}
                        <div className={`row_2 border--2 border-red-900 w-full h-fit max-lg:mt-3 mt-5 grid xl:grid-cols-3 gap-3`}>
                            {/* table */}
                            <div className={`border--2 border-[red] h-full ms-0 lg:my-0 max-lg:my-0 my-5 lg:pb-0 max-lg:pb-0 pb-5 xl:col-span-2`}>
                                <DashTable head={pharmacy_table_head} data={userTableData} tableHeading={'Orders Status'} />
                            </div>

                            {/* charts */}
                            <div className={`border--2 border-teal-900 flex flex-col gap-2`}>
                                {/* bar chart */}
                                <div className='border--2 border-gray-950 box_shadow_sec rounded-xl bg-white h-fit'>
                                    <h2 className={`mb-2 p-5 ${text_color}`}>Monthly Revenue</h2>
                                    <ResponsiveContainer width='100%' height='75%'>
                                        <BarChart
                                            width={500}
                                            height={30}
                                            data={data}
                                            margin={{
                                                top: 0,
                                                right: 30,
                                                left: -3,
                                                bottom: 5,
                                            }}>
                                            <CartesianGrid strokeDasharray='3 3' />
                                            <XAxis dataKey='name' interval={0} textAnchor='end' tick={{ fontSize: 12 }} />
                                            <YAxis tick={{ fontSize: 12 }} />
                                            <Tooltip />
                                            <Bar dataKey='amt' fill='#de8127' shape={<CustomBar />} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* area chart */}
                                <div className={`border--2 border-gray-950 box_shadow_sec rounded-xl max-lg:mt-1 ${bg_color} h-fit`}>
                                    <h2 className='mb-2 p-5 text-[#fff]'>Patient’s Enrollment</h2>
                                    <ResponsiveContainer width='100%' height='75%'>
                                        <AreaChart
                                            width={500}
                                            height={30}
                                            data={data_area_chart}
                                            margin={{
                                                top: 0,
                                                right: 30,
                                                left: -3,
                                                bottom: 5,
                                            }}>
                                            <CartesianGrid strokeDasharray='3 3' />
                                            <XAxis dataKey='name' interval={0} textAnchor='end' tick={{ fontSize: 12 }} />
                                            <YAxis tick={{ fontSize: 12 }} />
                                            <Tooltip labelStyle={{ color: '#000' }} />
                                            <Area type='monotone' dataKey='uv' stroke='#fff' fill='#ffffff71' strokeWidth={2} dot={{ r: 3 }} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            ) : getTableSkeleton ? (
                <DashboardSkeleton />
            ) : (
                <div className='relative'>
                    {/* <Loader /> */}

                    {/* cards warap*/}
                    <div className={`bg-white box_shadow_sec rounded-xl h-fit`}>
                        <div className='p-4 pb-1'>
                            <h2 className={`mb-2 ${text_color} w-full`}>Today's Reports</h2>
                            <small className='text-slate-500'> sales summary </small>
                        </div>
                        <div className={`row_1 border--2 border-blue-900 rounded-xl p-4 w-full h--[15rem] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 overflow-auto`}>
                            <Card title={num_of_pharmacy} desc='Total Pharmacies' percent_text_color='text-white' rev_percent='+8%' past_days='from yesterday' icon={<FaShop className='text-4xl md:text-5xl lg:text-4xl xl:text-[4.5vw] text-white' />} />
                            <Card title={num_of_total_clients} desc='Total Clients' percent_text_color='text-white' rev_percent='+8%' past_days='from yesterday' icon={<FaUserGroup className='text-4xl md:text-5xl lg:text-4xl xl:text-[4.5vw] text-white' />} />
                            <Card title={num_of_total_orders} desc='Total Orders' percent_text_color='text-white' rev_percent='+8%' past_days='from yesterday' icon={<GiBeachBag className='text-4xl md:text-5xl lg:text-4xl xl:text-[4.5vw] text-white' />} />
                            <Card title={`4K`} desc='Total Revenue' percent_text_color='text-white' rev_percent='+8%' past_days='from yesterday' icon={<MdAccountBalanceWallet className='text-4xl md:text-4xl lg:text-5xl xl:text-[4.5vw] text-white' />} />
                        </div>
                    </div>

                    {/* charts and tables */}
                    <div className={`row_2 border--2 border-red-900 w-full h-fit mt-5 grid lg:grid-cols-3 `}>
                        <div className={`border--2 border-teal-900 flex flex-col gap-2`}>
                            {/* bar chart */}
                            <div className='border--2 border-gray-950 box_shadow_sec rounded-xl bg-white h-fit'>
                                <h2 className={`mb-2 p-5 ${text_color}`}>Monthly Revenue</h2>
                                <ResponsiveContainer width='100%' height='75%'>
                                    <BarChart
                                        width={500}
                                        height={30}
                                        data={data}
                                        margin={{
                                            top: 0,
                                            right: 30,
                                            left: -3,
                                            bottom: 5,
                                        }}>
                                        <CartesianGrid strokeDasharray='3 3' />
                                        <XAxis dataKey='name' interval={0} textAnchor='end' tick={{ fontSize: 12 }} />
                                        <YAxis tick={{ fontSize: 12 }} />
                                        <Tooltip />
                                        <Bar dataKey='amt' fill='#de8127' shape={<CustomBar />} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* pie chart */}
                            <div className={`border--2 border-gray-950 box_shadow_sec rounded-xl ${bg_color} h-fit`}>
                                <h2 className='mb-2 p-5 text-[#fff]'>Monthly Revenue</h2>
                                <ResponsiveContainer width='100%' height='75%'>
                                    <PieChart width={400} height={400}>
                                        <Pie
                                            data={data_pie}
                                            cx='50%'
                                            cy='50%'
                                            labelLine={false}
                                            label={renderCustomizedLabel}
                                            outerRadius={95}
                                            fill='#8884d8'
                                            // dataKey="value"
                                        >
                                            {data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* table */}
                        <div className={` lg:ms-5 ms-0 lg:my-0 my-5 lg:pb-0 pb-5 lg:col-span-2`}>
                            <DashTable head={TableHead} data={adminTableData} />
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    )
}

export default page
