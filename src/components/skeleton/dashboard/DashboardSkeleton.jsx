'use client'

import React from 'react'

// ////////////////////////////////////////////
import Card from '@/components/card/card'
import { getCookie } from 'cookies-next'
import { useSelector } from 'react-redux'
import TableSkeleton from '../tables/TableSkeleton'
import Loader from '@/components/pageLoader/loader'

const DashboardSkeleton = () => {
    const text_color = useSelector((state) => state.theme.text_color)
    const bg_color = useSelector((state) => state.theme.bg_color)

    const getData = getCookie('digitalrx') ? JSON?.parse(getCookie('digitalrx')) : getCookie('digitalrx')
    const userRoll = getData?.role[0]

    return (
        <>
            {userRoll === 'pharmacy' ? (
                <div className='relative'>
                    <Loader />

                    {/* cards warap*/}
                    <div className={`bg-white box_shadow_sec rounded-xl h-fit`}>
                        <div className='p-4 pb-1'>
                            <h2 className={`mb-2 ${text_color} w-full`}>
                                <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>
                            </h2>
                            <small className='text-slate-500'>
                                {' '}
                                <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>{' '}
                            </small>
                        </div>
                        <div className={`row_1 border--2 border-blue-900 rounded-xl p-4 w-full h--[15rem] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 overflow-auto`}>
                            <Card title={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2'></div>} desc={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>} percent_text_color='text-white' rev_percent={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>} past_days={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>} icon={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-4 mb-4'></div>} />
                            <Card title={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2'></div>} desc={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>} percent_text_color='text-white' rev_percent={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>} past_days={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>} icon={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-4 mb-4'></div>} />
                            <Card title={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2'></div>} desc={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>} percent_text_color='text-white' rev_percent={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>} past_days={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>} icon={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-4 mb-4'></div>} />
                            <Card title={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2'></div>} desc={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>} percent_text_color='text-white' rev_percent={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>} past_days={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>} icon={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-4 mb-4'></div>} />
                        </div>
                    </div>

                    {/* charts and tables */}
                    <div className={`row_2 border--2 border-red-900 w-full h-fit max-lg:mt-3 mt-5 grid xl:grid-cols-3 gap-3`}>
                        {/* table */}
                        <div className={`border--2 border-[red] rounded-xl bg-white h-full ms-0 lg:my-0 max-lg:my-0 my-5 lg:pb-0 max-lg:pb-0 pb-5 xl:col-span-2`}>
                            {Array.from({ length: 6 }).map((item_, i) => (
                                <TableSkeleton key={i} className='mt-3' />
                            ))}
                        </div>

                        {/* charts */}
                        <div className={`border--2 border-teal-900 flex flex-col gap-2`}>
                            {/* bar chart */}
                            <div className='border--2 border-gray-950 box_shadow_sec rounded-xl bg-white h-fit'>
                                <h2 className={`mb-2 p-5 ${text_color}`}>
                                    <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2'></div>
                                </h2>
                                <div className='mb-2 p-5'>
                                    <div className='h-[10rem] rounded-xl bg-gray-200 rounded--full dark:bg-gray-700 w-full mb-2'></div>
                                </div>
                            </div>

                            {/* area chart */}
                            <div className={`border--2 border-gray-950 box_shadow_sec rounded-xl max-lg:mt-1 ${bg_color} h-fit`}>
                                <h2 className={`mb-2 p-5 ${text_color}`}>
                                    <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2'></div>
                                </h2>
                                <div className='mb-2 p-5'>
                                    <div className='h-[10rem] rounded-xl bg-gray-200 rounded--full dark:bg-gray-700 w-full mb-2'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='relative'>

                    <Loader />

                    {/* cards warap*/}
                    <div className={`bg-white box_shadow_sec rounded-xl h-fit`}>
                        <div className='p-4 pb-1'>
                            <h2 className={`mb-2 ${text_color} w-full`}>
                                <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>
                            </h2>
                            <small className='text-slate-500'>
                                {' '}
                                <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>{' '}
                            </small>
                        </div>
                        <div className={`row_1 border--2 border-blue-900 rounded-xl p-4 w-full h--[15rem] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 overflow-auto`}>
                            <Card title={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2'></div>} desc={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>} percent_text_color='text-white' rev_percent={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>} past_days={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>} icon={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-4 mb-4'></div>} />
                            <Card title={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2'></div>} desc={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>} percent_text_color='text-white' rev_percent={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>} past_days={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>} icon={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-4 mb-4'></div>} />
                            <Card title={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2'></div>} desc={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>} percent_text_color='text-white' rev_percent={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>} past_days={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>} icon={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-4 mb-4'></div>} />
                            <Card title={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2'></div>} desc={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>} percent_text_color='text-white' rev_percent={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>} past_days={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>} icon={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-4 mb-4'></div>} />
                        </div>
                    </div>

                    {/* charts and tables */}
                    <div className={`row_2 border--2 border-red-900 w-full h-fit mt-5 grid lg:grid-cols-3 `}>
                        <div className={`border--2 border-teal-900 flex flex-col gap-2 me-3`}>
                            {/* bar chart */}
                            <div className='border--2 border-gray-950 box_shadow_sec rounded-xl bg-white h-fit'>
                                <h2 className={`mb-2 p-5 ${text_color}`}>
                                    <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2'></div>
                                </h2>
                                <div className='mb-2 p-5'>
                                    <div className='h-[10rem] rounded-xl bg-gray-200 rounded--full dark:bg-gray-700 w-full mb-2'></div>
                                </div>
                            </div>

                            {/* pie chart */}
                            <div className={`border--2 border-gray-950 box_shadow_sec rounded-xl ${bg_color} h-fit`}>
                                <h2 className={`mb-2 p-5 ${text_color}`}>
                                    <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2'></div>
                                </h2>
                                <div className='mb-2 p-5'>
                                    <div className='h-[10rem] rounded-xl bg-gray-200 rounded--full dark:bg-gray-700 w-full mb-2'></div>
                                </div>
                            </div>
                        </div>

                        {/* table */}
                        <div className={`border--2 border-[red] rounded-xl bg-white h-full ms-0 lg:my-0 max-lg:my-0 my-5 lg:pb-0 max-lg:pb-0 pb-5 xl:col-span-2`}>
                            {Array.from({ length: 6 }).map((item_, i) => (
                                <TableSkeleton key={i} className='mt-3' />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default DashboardSkeleton
