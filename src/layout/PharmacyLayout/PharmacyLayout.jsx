"use client"
import { useSearch } from '@/app/SearchContext';
import Button from '@/components/button/Button';
import Field from '@/components/inputFIeld/Field'
import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import DashboardLayout from '../DLayout/DashboardLayout';
import Loader from '@/components/pageLoader/loader';

const PharmacyLayout = ({ children, isReference, headingName, isSearch = true }) => {
    const { updateSearchQuery } = useSearch();

    const userRoll = 'pharmacy';

    const handleSearchChange = (e) => {
        updateSearchQuery(e.target.value);
    };

    return (
        <DashboardLayout>

            {
                userRoll === 'pharmacy' ?
                    <div className='bg-white py-12 xl:px-12 px-8 rounded-xl max-h-fit min-h-full relative'>
                        <div className='flex justify-between gap-4 lg:flex-row flex-col items-center mb-8'>

                            <h1 className='text-primary-color'>{headingName ? headingName : "Profile"}</h1>

                            <div className='flex gap-4 sm:flex-row flex-col'>

                                <div className={`flex items-center rounded-xl overflow-hidden pr-2 ${isSearch ? "flex" : "hidden"}`} style={{ border: "1px solid var(--primary-color)" }}>
                                    <Field type='text' onChange={handleSearchChange} className={`border-2 border-black rounded-full`} bgColor="#fff" placeHolder="Search" />
                                    <IoSearchSharp size={32} color='var(--primary-color)' />

                                </div>

                            </div>
                        </div>
                        <Loader />
                        {children}
                    </div>
                    :
                    <div className='bg-white py-12 xl:px-12 px-8 rounded-xl relative'>
                        <div className='flex justify-between gap-4 lg:flex-row flex-col items-center mb-8'>
                            {isReference ?
                                <div className='flex items-center gap-2 2xl:flex-row flex-col'>
                                    <h1 className='text-primary-color'>{headingName ? headingName : "Pharmacies"}</h1>
                                    <p className='m-0 p-0 sm:text-2xl text-sm text-primary-color whitespace-nowrap'>(Sunrise Pharmacy)</p>
                                </div>
                                :
                                <h1 className='text-primary-color'>Pharmacies</h1>
                            }
                            <div className='flex gap-4 sm:flex-row flex-col'>

                                <div className='flex items-center rounded-xl overflow-hidden pr-2 ' style={{ border: "1px solid var(--primary-color)" }}>
                                    <Field type='text' onChange={handleSearchChange} className="border-2 border-black rounded-full" bgColor="#fff" placeHolder="Search" />
                                    <IoSearchSharp size={32} color='var(--primary-color)' />

                                </div>

                                <span className='xl:w-[10rem] lg:w-[12rem] sm:w-[10rem] w-full flex items-center justify-center'>
                                    <Button name="Add Pharmacy" bgcolor="bg-primary-color" textColor="text-white-color" icon={<FaPlus />} className="px-0" pClass="items-center justify-center" style={{
                                        paddingInline: "0"
                                    }} />
                                </span>

                            </div>
                        </div>
                        <Loader />
                        {children}
                    </div>
            }


        </DashboardLayout>
    )
}

export default PharmacyLayout
