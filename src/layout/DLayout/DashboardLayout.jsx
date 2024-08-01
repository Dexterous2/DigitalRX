'use client'
import styles from './DLayout.module.css'
import { AiFillHome } from 'react-icons/ai'
import Button from '@/components/button/Button'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaBars, FaShop } from 'react-icons/fa6'
import { FaBarsStaggered } from 'react-icons/fa6'
import Link from 'next/link'
import { IoPersonSharp } from 'react-icons/io5'
import { BiSolidLogOut } from 'react-icons/bi'
import { MdHome } from 'react-icons/md'
import { BsFillBasket3Fill } from 'react-icons/bs'
import { FaUserGroup } from 'react-icons/fa6'
import { FaCodePullRequest } from 'react-icons/fa6'
import { FaUser } from 'react-icons/fa'
import { deleteCookie, getCookie } from 'cookies-next'
import { MdPaid } from 'react-icons/md'
import { MdChecklist } from 'react-icons/md'
import { IoWalletSharp } from 'react-icons/io5'
import { GrPlan } from 'react-icons/gr'
import { LuPackageCheck } from 'react-icons/lu'
import { useGetPharmacyStatusQuery } from '@/Redux/PharmacyAuthSlice/PharmacyAuthSlice'
import Loader from '@/components/pageLoader/loader'

const DashboardLayout = ({ children }) => {
    const [display, setDisplay] = useState(false)

    const userData = getCookie('digitalrx') ? JSON?.parse(getCookie('digitalrx')) : getCookie('digitalrx')
    const userRoll = userData?.role[0]
    const userID = userData?._id
    const isSubscribed = userData?.subscription_id ? true : false

    // Get Pharmacy Status
    const getPharmacyStatus = useGetPharmacyStatusQuery(userID, { skip: !userID })
    const getPharmacyStatusData = getPharmacyStatus?.data?.status[0]
    const activeStatus = getPharmacyStatusData === 'Active' ? true : false

    const pathName = usePathname()

    let pharmacyPath

    if (pathName.startsWith('/patients-profile') || pathName === '/all-patients') {
        pharmacyPath = true
    }

    let adminPath
    if (pathName.startsWith('/pharmacy') || pathName === '/pharmacy-profile' || pathName.startsWith('/orders') || pathName.startsWith('/patients-profile')) {
        adminPath = true
    }

    const handleLogout = () => {
        const cookies = getCookie('digitalrx')
        if (cookies) {
            deleteCookie('digitalrx')
            // router.push("/login")
        }
    }

    return (
        <main className={`${styles.main} w-100 h-screen flex relative overflow-hidden`}>
            
            <div className='border--2 border-[green] bg-white box_shadow_sec w-full h-[5rem] absolute top-0 left-0 justify-center items-center max-lg:flex hidden z-[99999]'>
                <div className='border--2 border-[teal] w-full h-full flex items-center ps-5'>
                    <div onClick={() => setDisplay(true)} className={`bg-[#de8127] border--2 border-[pink] box_shadow_sec cursor-pointer rounded-xl w-[3rem] h-[3rem] mb--5 flex justify-center items-center lg:hidden z-10`}>
                        <FaBars className='text-[#fff] text-2xl' />
                    </div>
                </div>
            </div>

            <div
                className={`${styles.sidebar} border-green-800 box_shadow_sec absolute h-full w-[16rem] 
            ${!display ? 'translate-x-[-100vw]' : 'lg:translate-x-[0%]'} transition-all duration-300 lg:translate-x-[0%] lg:w-[20rem] lg:relative z-50`}>
                <div className='relative w-full h-full'>
                    <div onClick={() => setDisplay(false)} className={`border-2 border-white box_shadow_sec cursor-pointer bg-[#de8127] rounded-xl w-[3rem] h-[3rem] mb-5 absolute top-[1rem] right-[1rem] flex justify-center items-center lg:hidden`}>
                        <FaBarsStaggered className='text-[#fff] text-2xl' />
                    </div>

                    <div className={`${styles.sidebar_img} border-0 border-b-[1px] border-[#ffffff5d] max-sm:h-[8rem] h-[10rem] flex justify-center items-center`}>
                        <img src='/image/main/logoWhite.png' alt='img.png' className='w-[3rem] h-[6rem] object-cover' />
                    </div>

                    {userRoll === 'pharmacy' ? (
                        <div
                            className={`border--2 border-purple-950 w-100 xl:h-auto h-[56vh]
                         flex flex-col justify-start items-center gap-2 mt-4 px-4 overflow-hidden overflow-y-auto`}>
                            <Link href='/dashboard' className='w-full'>
                                <Button
                                    name={'Dashboard'}
                                    textColor={pathName === '/dashboard' ? 'text-primary-color' : 'text-white'}
                                    bgcolor={pathName === '/dashboard' ? 'bg-white-color' : 'bg-primary-color'}
                                    icon={
                                        <div>
                                            {' '}
                                            <MdHome className='text-xl' />{' '}
                                        </div>
                                    }
                                />
                            </Link>
                            {isSubscribed && activeStatus ? (
                                <>
                                    <Link href='/orders-list' className='w-full'>
                                        <Button
                                            name={'Order'}
                                            textColor={pathName === '/orders-list' ? 'text-primary-color' : 'text-white'}
                                            bgcolor={pathName === '/orders-list' ? 'bg-white-color' : 'bg-primary-color'}
                                            icon={
                                                <div>
                                                    <BsFillBasket3Fill className='text-xl' />
                                                </div>
                                            }
                                        />
                                    </Link>

                                    <Link href='/paid-orders' className='w-full'>
                                        <Button
                                            name={'Paid Orders'}
                                            textColor={pathName === '/paid-orders' ? 'text-primary-color' : 'text-white'}
                                            bgcolor={pathName === '/paid-orders' ? 'bg-white-color' : 'bg-primary-color'}
                                            icon={
                                                <div>
                                                    <MdPaid className='text-xl' />
                                                </div>
                                            }
                                        />
                                    </Link>

                                    <Link href='/completed-orders' className='w-full'>
                                        <Button
                                            name={'Completed'}
                                            textColor={pathName === '/completed-orders' ? 'text-primary-color' : 'text-white'}
                                            bgcolor={pathName === '/completed-orders' ? 'bg-white-color' : 'bg-primary-color'}
                                            icon={
                                                <div>
                                                    {' '}
                                                    <MdChecklist className='text-xl' />{' '}
                                                </div>
                                            }
                                        />
                                    </Link>

                                    <Link href='/all-patients' className='w-full'>
                                        <Button
                                            name={'Patients'}
                                            textColor={pharmacyPath ? 'text-primary-color' : 'text-white'}
                                            bgcolor={pharmacyPath ? 'bg-white-color' : 'bg-primary-color'}
                                            icon={
                                                <div>
                                                    <FaUserGroup className='text-xl' />
                                                </div>
                                            }
                                        />
                                    </Link>
                                </>
                            ) : null}

                            <Link href='/profile' className='w-full'>
                                <Button
                                    name={'Profile'}
                                    textColor={pathName === '/profile' ? 'text-primary-color' : 'text-white'}
                                    bgcolor={pathName === '/profile' ? 'bg-white-color' : 'bg-primary-color'}
                                    icon={
                                        <div>
                                            <FaUser className='text-xl' />
                                        </div>
                                    }
                                />
                            </Link>
                            {isSubscribed && activeStatus ? (
                                <Link href='/wallet' className='w-full'>
                                    <Button
                                        name={'Wallet'}
                                        textColor={pathName === '/wallet' ? 'text-primary-color' : 'text-white'}
                                        bgcolor={pathName === '/wallet' ? 'bg-white-color' : 'bg-primary-color'}
                                        icon={
                                            <div>
                                                <IoWalletSharp className='text-xl' />
                                            </div>
                                        }
                                    />
                                </Link>
                            ) : null}

                            <Link href='/subscription' className='w-full'>
                                <Button
                                    name={'Subscription'}
                                    textColor={pathName === '/subscription' ? 'text-primary-color' : 'text-white'}
                                    bgcolor={pathName === '/subscription' ? 'bg-white-color' : 'bg-primary-color'}
                                    icon={
                                        <div>
                                            <GrPlan className='text-xl' />
                                        </div>
                                    }
                                />
                            </Link>
                        </div>
                    ) : (
                        <div className={`border--2 border-purple-950 w-100 h-fit flex flex-col justify-center items-center gap-2 mt-4 px-4`}>
                            <Link href='/dashboard' className='w-full'>
                                <Button
                                    name={'Dashboard'}
                                    textColor={pathName === '/dashboard' ? 'text-primary-color' : 'text-white'}
                                    bgcolor={pathName === '/dashboard' ? 'bg-white-color' : 'bg-primary-color'}
                                    icon={
                                        <div>
                                            <MdHome className='text-xl' />
                                        </div>
                                    }
                                />
                            </Link>

                            <Link href='/pharmacy' className='w-full'>
                                <Button
                                    name={'Pharmacy'}
                                    textColor={adminPath ? 'text-primary-color' : 'text-white'}
                                    bgcolor={adminPath ? 'bg-white-color' : 'bg-primary-color'}
                                    icon={
                                        <div>
                                            <FaShop className='text-xl' />
                                        </div>
                                    }
                                />
                            </Link>

                            <Link href='/superadmin-profile' className='w-full'>
                                <Button
                                    name={'Profile'}
                                    textColor={pathName === '/superadmin-profile' ? 'text-primary-color' : 'text-white'}
                                    bgcolor={pathName === '/superadmin-profile' ? 'bg-white-color' : 'bg-primary-color'}
                                    icon={
                                        <div>
                                            <IoPersonSharp className='text-xl' />
                                        </div>
                                    }
                                />
                            </Link>

                            <Link href='/create-package' className='w-full'>
                                <Button
                                    name={'Package'}
                                    textColor={pathName === '/create-package' ? 'text-primary-color' : 'text-white'}
                                    bgcolor={pathName === '/create-package' ? 'bg-white-color' : 'bg-primary-color'}
                                    icon={
                                        <div>
                                            <LuPackageCheck className='text-xl' />
                                        </div>
                                    }
                                />
                            </Link>
                        </div>
                    )}

                    <div className='border-0 border-t-[1px] border-[#ffffff5d] bg-[#de8127] w-[100%] h-[3rem] absolute bottom-0 flex justify-center items-center px-4'>
                        <Link href={'/login'} className='w-full'>
                            <Button name={'Log out'} textColor='text-white' bgcolor='var(--primary-color)' icon={<BiSolidLogOut />} className='hover:bg-white hover:text-primary-color transition-all duration-500' isHover={true} onClick={handleLogout} />
                        </Link>
                    </div>
                </div>
            </div>

            <div className={`${styles.deshboard_wrap} border--2 border-[red] w-[100%] object-cover p-5 md:p--10 pt-[6rem] lg:pt-[2rem] overflow-hidden overflow-y-auto relative`}>
                <Loader />
                {children}
            </div>
        </main>
    )
}

export default DashboardLayout
