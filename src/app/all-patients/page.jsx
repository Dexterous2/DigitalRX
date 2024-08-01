'use client'
import PatientsCards from '@/components/patientsCards/PatientsCards'
import PharmacyLayout from '@/layout/PharmacyLayout/PharmacyLayout'
import React from 'react'
import { usePharmacyUsersQuery } from '@/Redux/PharmacyAuthSlice/PharmacyAuthSlice'
import { MdOutlineBrowserNotSupported } from "react-icons/md";
import { getCookie } from 'cookies-next'
import { useSearch } from '../SearchContext'
import PatientSkeleton from '@/components/skeleton/patients/PatientsSkeletton'

const page = () => {
    const userData = getCookie('digitalrx') ? JSON?.parse(getCookie('digitalrx')) : getCookie('digitalrx')
    const { searchQuery } = useSearch();

    const userID = userData?._id

    const { data, isLoading: getUserLoading } = usePharmacyUsersQuery({ userID })

    return (
        <PharmacyLayout isReference headingName={'Patients'}>
            {data?.users?.length != 0 ? (
                <div className='row_1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5'>

                    {
                        getUserLoading ? 
                        Array?.from({length: 4}).map((item_, i) => (
                            <PatientSkeleton key={i} />
                        ))
                        :
                        data?.users?.filter(item => item?.id_card_no?.toLowerCase()?.includes(searchQuery?.toLowerCase()))?.map((item, i) => (
                            <PatientsCards key={i} data={item} />
                        ))
                    }
                </div>
            ) : (
                <div className='border--2 border-[red] w-full h-full flex flex-col justify-center items-center'>
                    <MdOutlineBrowserNotSupported className='text-[#de8327ad] text-3xl' />
                    <h2 className='text-[#de8327ad]'>No Patient Yet</h2>
                </div>
            )}
        </PharmacyLayout>
    )
}

export default page
