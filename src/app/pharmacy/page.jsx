'use client'
import PharmacyLayout from '@/layout/PharmacyLayout/PharmacyLayout'
import React from 'react'
import { useSearch } from '../SearchContext'
import PharmacyCards from '@/components/PharmacyCards/PharmacyCards'
import { useGetAllPharmaciesQuery } from '@/Redux/PharmacyAuthSlice/PharmacyAuthSlice'
import { MdOutlineBrowserNotSupported } from 'react-icons/md'
import PharmacySkeleton from '@/components/skeleton/pharmacy/PharmacySkeletton'

const page = () => {
    const { searchQuery } = useSearch()
 
    const { data, isLoading } = useGetAllPharmaciesQuery()
    // console.log(data);

    return (
        <PharmacyLayout headingName={"All Pharmacies"}>
            <div className='row_1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5'>
                {data?.length != 0 ? (

                    isLoading ? (
                        Array?.from({ length: 4 }).map((item_, i) => (
                            <React.Fragment key={i}>
                                <PharmacySkeleton />
                            </React.Fragment>
                        ))
                    ) :
                        data?.filter((item) => item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()))?.map((item, i) => <PharmacyCards img={item.profileImg} name={item.name} address={item.address} id={item?._id} key={i} />)

                ) : (
                    <div className='border--2 border-[red] col-span-full w-full h-full flex flex-col justify-center items-center'>
                        <MdOutlineBrowserNotSupported className='text-[#de8327ad] text-3xl' />
                        <h2 className='text-[#de8327ad]'>No Pharmacy Yet</h2>
                    </div>
                )}
            </div>
        </PharmacyLayout>
    )
}
export default page
