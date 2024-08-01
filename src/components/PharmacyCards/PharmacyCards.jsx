import Image from 'next/image'
import React from 'react'
import Button from '../button/Button'
import { GoDotFill } from "react-icons/go";
import { useRouter } from 'next/navigation';

const PharmacyCards = ({ name, address, id, img }) => {
    const router = useRouter()
    return (
        <div className='bg-[#FFF6EB] p-4 rounded-xl flex flex-col items-center justify-between gap-6 w-full border card_shadow_orange py-8'>
            <div className='flex flex-col gap-4 items-center justify-center'>

                <Image src={img} width={300} height={300} alt='Pharmacy' className='w-[12rem] h-[10rem] rounded-xl' />
                <div className='flex flex-col items-center gap-1'>

                    <h3 className='text-[#DE8127] text-2xl font-semibold'>{name}</h3>

                    <p className='text-sm'>{address}</p>

                </div>
                <div className='border--2 border-[red]  overflow-hidden overflow-y-auto'>
                    <ul>
                        <li className='flex items-center gap-2 text-sm'>
                            <GoDotFill color='#DE8127' />
                            Joined from 2018</li>
                        <li className='flex items-center gap-2 text-sm'>
                            <GoDotFill color='#DE8127' />
                            Subscription ends on 18 mar 2023</li>
                        <li className='flex items-center gap-2 text-sm'>
                            <GoDotFill color='#DE8127' />
                            150+ Patients</li>
                    </ul>
                </div>
            </div>

            <Button name={"View Profile"} style={{ borderRadius: "50px", paddingInline: "2rem", width: "fit-content" }} bgcolor="bg-primary-color" textColor="text-white-color" className={"w-fit"} onClick={() => router.push(`/pharmacy/pharmacy-profile/${id}`)} />
        </div>
    )
}

export default PharmacyCards
