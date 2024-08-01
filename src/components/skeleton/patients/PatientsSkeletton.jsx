'use client'

import Button from "@/components/button/Button"

const PatientSkeleton = () => {
    return (
        // <div role='status' className='max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700 flex flex-col justify-between'>
        //     <div>
        //         <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>
        //         <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5'></div>
        //         <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5'></div>
        //         <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700'></div>
        //     </div>
        //     <div className='flex items-center mt-4'>
        //         <div className='w-full'>
        //             <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2'></div>
        //             <div className='w-full h-10 bg-gray-200 rounded-lg dark:bg-gray-700'></div>
        //         </div>
        //     </div>
        //     <span className='sr-only'>Loading...</span>
        // </div>

        <div className='flex flex-col bg-[#FFF6EB] w-full items-center gap-4 p-4 rounded-xl card_shadow_orange'>
            <div className='flex flex-col w-52 items-center gap-4 h-full justify-between'>
                <div className='flex flex-col items-center gap-4 w-full'>

                    <div className='rounded-[100%] sm:w-auto min-w-[10rem] h-[10rem] object-cover bg-gray-300 dark:bg-gray-700'>
                        <svg className='w-10 h-10 text-gray-200 dark:text-gray-600' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 16 20'>
                            <path d='M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z' />
                        </svg>
                    </div>

                    <span className='flex flex-col gap-2 items-center w-full'>
                        <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>
                        <div className='flex justify-start w-full'>
                            <div>
                                {' '}
                                <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>
                            </div>
                            <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>
                        </div>
                    </span>

                </div>

                <div className='w-full'>
                    <ul>
                        <li className='flex items-center gap-2 text-sm'>
                            <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>
                        </li>
                        <li className='flex items-center gap-2 text-sm'>
                            <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>
                        </li>
                        <li className='flex items-center gap-2 text-sm'>
                            <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>
                        </li>
                    </ul>
                </div>

                <Button
                    name={<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>}
                    bgcolor='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'
                    textColor='text-white-color'
                    className={'w-fit'}
                />
            </div>
        </div>
    )
}

export default PatientSkeleton
