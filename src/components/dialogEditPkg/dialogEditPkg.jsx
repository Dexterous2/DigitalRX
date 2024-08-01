import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import Field from '../inputFIeld/Field'
import { useEffect, useState } from 'react'
import { useUpdateSubscriptionStatusMutation } from '@/Redux/subscriptionSlice/SubscriptionSlice'
import { getCookie } from 'cookies-next'
import ResponseToast from '../toast/Toast'
// import { useGetSubscriptionQuery } from '@/Redux/subscriptionSlice/SubscriptionSlice'

export function AlertDialogEdit({ icon, item }) {

    const [editData, setEditData] = useState({
        title: '',
        price: '',
        description: '',
        duration: '',
        status: '',
    })
    const { title, price, description, duration, status } = editData
    const handelChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value })
    }

    useEffect(() => {

        setEditData({
            title: item?.title,
            price: item?.price,
            description: item?.description,
            duration: item?.duration?.[0],
            status: item?.status?.[0],
        })

    }, [item])

    const userID =  JSON.parse(getCookie('digitalrx'))?._id;

    const [updatePkg, { isLoading:getUpdateLoading }] = useUpdateSubscriptionStatusMutation();
    const handelUpdateSubmit = async () => {
        try {
            const res = await updatePkg({user_id:userID, package_id:item?._id, data:editData});
            // console.log(res);
            ResponseToast({res});
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant='outline' className={`bg-transparent w-fit border-0`}>
                    {icon}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-[#de8127]'>Edit Package</AlertDialogTitle>

                    <div className='rw_2 border--2 border-red-600 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-5 mb-0 p-4'>

                        <div>
                            <label htmlFor='' className='text-[#de8127]'>
                                Title
                            </label>
                            <Field placeHolder='Title' name={'title'} value={title} onChange={handelChange} />
                        </div>
                        <div>
                            <label htmlFor='' className='text-[#de8127]'>
                                Price
                            </label>
                            <Field placeHolder='Price' name={'price'} value={price} onChange={handelChange} />
                        </div>
                        <div>
                            <label htmlFor='' className='text-[#de8127]'>
                                Duration
                            </label>
                            <Field placeHolder='Duration' name={'duration'} value={duration} onChange={handelChange} />
                        </div>
                        <div>
                            <label htmlFor='' className='text-[#de8127]'>
                                Description
                            </label>
                            <Field type='textarea' row={2} placeHolder='Description' name={'description'} value={description} onChange={handelChange} />
                        </div>

                        <div>
                            <select name='status' value={status} onChange={handelChange} className='w-full h-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring--1 focus:ring--blue-600'>
                                <option value='Active'>Active</option>
                                <option value='Disabled'>Disable</option>
                            </select>
                        </div>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={()=>(handelUpdateSubmit())} className='bg-[#de8127]' >Submit</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
