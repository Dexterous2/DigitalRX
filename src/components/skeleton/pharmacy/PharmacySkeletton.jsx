import Image from 'next/image'
import React from 'react'
import Button from "@/components/button/Button"
import { GoDotFill } from 'react-icons/go'
import { useRouter } from 'next/navigation'

const PharmacySkeleton = ({ name, address }) => {
    const router = useRouter()
    return (
        <div className='bg-[#FFF6EB] p-4 rounded-xl flex flex-col items-center justify-center gap-6 w-full border card_shadow_orange'>
            <div className='rounded-[100%] sm:w-auto min-w-[10rem] h-[10rem] object-cover bg-gray-300 dark:bg-gray-700'>
                <svg className='w-10 h-10 text-gray-200 dark:text-gray-600' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 16 20'>
                    <path d='M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z' />
                </svg>
            </div>

            <div className='flex flex-col items-center gap-1'>
                <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>
                <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>
            </div>

            <div className='border--2 border-[red] h-[6rem] overflow-hidden overflow-y-auto'>
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
            <div className='h-[3rem] bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>
        </div>
    )
}

export default PharmacySkeleton
