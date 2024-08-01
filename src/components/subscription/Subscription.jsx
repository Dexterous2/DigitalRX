'use client'

import { useCancelSubscriptionMutation, useGetSubscriptionQuery, useSelectSubcriptionMutation } from '@/Redux/subscriptionSlice/SubscriptionSlice'
import Button from '../button/Button'
import { GoCheckCircleFill } from 'react-icons/go'
import { useEffect, useState } from 'react'
import { getCookie, setCookie } from 'cookies-next'
import ResponseToast from '../toast/Toast'
import { useSearch } from '@/app/SearchContext'
import SubSkeleton from '../skeleton/subscription/SubSkeleton'
import { useGetPharmacyStatusQuery } from '@/Redux/PharmacyAuthSlice/PharmacyAuthSlice'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

const Subscription = () => {
    const [subscribeCradId, setSubscribeCardId] = useState('');
    const { searchQuery } = useSearch();

    const text_color = useSelector((state) => state.theme.text_color);
    const bg_color = useSelector((state) => state.theme.bg_color);

    const router = useRouter()

    const { data, isLoading: getPackageLoading } = useGetSubscriptionQuery()
    const pkg_data = data?.subscriptions

    const cookies_digitalRx = getCookie('digitalrx') ? JSON?.parse(getCookie('digitalrx')) : getCookie('digitalrx');
    const pharmacyId = cookies_digitalRx?._id;
    const subscribed_id = cookies_digitalRx?.subscription_id;
    const userID = cookies_digitalRx?._id;

    // Get Pharmacy Status
    const getPharmacyStatus = useGetPharmacyStatusQuery(userID, { skip: !userID })
    const getPharmacyStatusData = getPharmacyStatus?.data?.status[0]
    const activeStatus = getPharmacyStatusData === "Active" ? true : false

    // post api (select subscription) 
    const [selectSubscription, { isLoading }] = useSelectSubcriptionMutation();
    const handelSunbscription = async (id) => {
        try {
            if (!activeStatus) {
                return ResponseToast({ message: "You cannot buy this subscription yet." })
            }
            setSubscribeCardId(id)

            const res = await selectSubscription({ pharmacyid: pharmacyId, subscription_id: id })

            ResponseToast({ res })

            if (!res.error) {
                setCookie('digitalrx', res?.data?.cookie)
                router.push("/dashboard")
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Cancel subscription API
    const [cancelSubscription, { isLoading: cancelLoading }] = useCancelSubscriptionMutation()

    // Handle Cancel subscription
    const handleCancelSubscription = async (subID) => {
        try {
            setSubscribeCardId(subID)

            const res = await cancelSubscription({
                pharmacyId: userID,
                subscriptionId: subID
            })


            ResponseToast({ res })

            if (!res.error) {
                setCookie('digitalrx', res?.data?.cookie)
                router.push("/dashboard")
            }
        } catch (error) {
            ResponseToast({ message: "Please try again later" })
        }
    }

    return (

        getPackageLoading ?
            Array.from({ length: 5 }).map((_item, _i) => (

                <SubSkeleton key={_i} />
            ))

            :
            
            pkg_data?.filter(item => item.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())).map((item) => (
                <div className='border--2 border-[green] box_shadow_sec bg-[#fff] w-full rounded-xl p-4 flex flex-col justify-between' key={item._id}>
                    <h4 className={`font-bold text-3xl md:text-3xl mb-2 ${text_color} max-h-fit`}> {item.title} </h4>
                    <div className={`max-h-fit w-full flex items-start ${text_color} my-3 sm:my-4 relative`}>
                        <span className='text-3xl md:text-3xl font-bold'> $ </span>
                        <span className='text-3xl md:text-3xl font-semibold'> {item.price} </span>
                        <span className='text-2xl self-end mt-3 ml-1'> /month </span>
                    </div>
                    <div className={`border--2 border-[red] min-h-fit max-h-[10rem] text-lg ${text_color} overflow-hidden overflow-y-auto`}>
                        <p className={`text-base ${text_color}`}>{item.description}</p>
                    </div>
                    <div className='max-h-fit mt-6'>
                        {
                            subscribed_id === item._id ?
                                <Button name={'Cancel Now'} className={`${bg_color} text-white w-full`} bgcolor={bg_color} isLoading={item?._id === subscribeCradId ? cancelLoading : false} onClick={() => handleCancelSubscription(item?._id)} disabled={false} />
                                :
                                <Button name={'Subscribe Now'} className={`${bg_color} text-white`} bgcolor={bg_color} isLoading={item?._id === subscribeCradId ? isLoading : false} onClick={() => handelSunbscription(item?._id)} />
                        }
                    </div>
                </div>
            ))

    )
}

export default Subscription
