'use client'

import styles from './card.module.css'


const Card = (props) => {

    return (
        <div className='card_wrapper min-h-fit flex'>
            <div className={`${styles.card} box_shadow_sec w-full flex justify-between p-3 rounded-lg`}>
                <div className='card_content__area space-y-1'>
                    <div>
                        <h4 className='text-[1.3rem] lg:text-[1.4rem] xl:text-[1.8rem] text-[#fff] font-semibold mb-0'> {props.title} </h4>
                        <h3 className='text-base lg:text-base xl:text-xl text-[#fff] m-0'>{props.desc}</h3>
                    </div>

                    <div className='flex items-center pt-2'>
                        <span className='text-[0.75rem] lg:text-[0.8rem] xl:text-[0.95rem] text-[#fff] font-medium'>
                            <span className={`text-xs xl:text-sm font-bold ${props.percent_text_color}`}> {props.rev_percent} </span>
                            {props.past_days}
                        </span>
                    </div>
                </div>

                <div className='icon_div h-fit flex justify-center items-center p-4 rounded-[50%]'>{props.icon}</div>
            </div>
        </div>
    )
}

export default Card

// /////////////////////////////
// balance card
// /////////////////////////////
export const BalanceCard = (props) => {
    const gradient = {
        grad: '',
        class: props.class,
    }

    return (
        <div
            className={`${styles.card} ${props.class} border--2 border-yellow-900 w-full h-[20rem] md:h-[25rem] rounded-xl flex flex-col justify-around items-center gap--3`}
            style={{
                backgroundImage: gradient.class === '' ? gradient.grad : gradient.class,
            }}>
            <div className='flex justify-center items-center'>
                {props.icon_1} <h3 className='text-[#fff] text-2xl md:text-3xl font-semibold ms-4'> {props.title} </h3>
            </div>
            <div className='flex flex-col justify-center items-center gap-2'>
                <h4 className='text-[#fff] text-lg font-medium'> {props.h4_1} </h4>
                <h2 className='text-[#fff]'> {props.h2_} </h2>
                <h4 className='text-[#ffffffaf] text-lg font-medium'> {props.h4_2} </h4>
            </div>
            {/* <div className='w-full flex justify-center items-center'>
                <Button name={'View Wallet'} className={'w-[10.5rem] rounded-full'} />
            </div> */}
        </div>
    )
}

// /////////////////////////////
// bar chart
// /////////////////////////////
import { BarChart, Bar, Rectangle, ResponsiveContainer, Legend, XAxis, Tooltip } from 'recharts'
// import ProfileTable from '../profileTable/ProfileTable';
import { DataTablePri } from '../dataTable/DataTable'

export const CardBarChart = (props) => {
    const gradient = {
        grad: '',
        class: props.class,
    }

    const text_color = useSelector((state) => state.theme.text_color);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className='custom-tooltip bg-transparent hover:bg-white fill-none'>
                    <p className={`label bg-white rounded-md p-2 ${text_color}`}>{`${label} : ${payload[0].value}`}</p>
                </div>
            )
        }

        return null
    }

    return (
        <div
            className={`${styles.card} ${props.class} border--2 border-yellow-900 w-full h-[20rem] rounded-xl flex flex-col justify-center items-center gap-3 p-4 max-sm:p-1`}
            style={{
                backgroundImage: gradient.class === '' ? gradient.grad : gradient.class,
            }}>
            <div className='border--2 border-red-800 w-full h--[3rem] flex max-[400px]:flex-col justify-between items-center p-4 pb-0'>
                <h3 className={`text-[#fff] max-[480px]:text-lg text-2xl font-semibold`}> {props.title} </h3>
            </div>

            <ResponsiveContainer width='100%' height='99%' className={'max-sm:p-1 ps-0'}>
                <BarChart
                    width={500}
                    height={300}
                    data={props.data_1}
                    margin={{
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 5,
                    }}>
                    <XAxis axisLine={false} tick={{ fill: 'white', stroke: '0' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey='pv' fill='transparent' stroke='white' radius={10} barSize={35} activeBar={<Rectangle fill='white' stroke='' />} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

// /////////////////////////////
// pie chart
// /////////////////////////////
import { PieChart, Pie, Cell } from 'recharts'
export const CardPieChart = (props) => {
    const gradient = {
        grad: '',
        class: props.class,
    }

    const data = [
        { name: 'In-Account', value: 500 },
        { name: 'Withdrawn', value: 1000 },
        { name: 'Unapproved', value: 500 },
    ]

    const COLORS = ['#24BFBE', '#FFF', '#560BAD']

    const CustomLegend = ({ payload }) => {
        return (
            <ul className='border--2 border-red-900 w-full flex flex-wrap justify-center gap-2 mb-3'>
                <li className='w-full flex justify-center text-white mb-2 mt-2'>
                    <p>Category</p>
                </li>

                {payload.map((entry, index) => (
                    <li
                        key={`legend-${index}`}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginRight: '20px',
                        }}>
                        <div
                            style={{
                                width: '12px',
                                height: '12px',
                                backgroundColor: entry.color,
                                marginRight: '5px',
                            }}
                        />
                        <span className='text-white ms-1'>{entry.value}</span>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <div
            className={`${styles.card} ${props.class} border--2 border-yellow-900 w-full max-[340px]:h-[57%] max-sm:h-[55%] h-[53%] rounded-xl flex flex-col justify-center items-center gap-3 max-sm:p-0 max-md:p-2 lg:p-1 xl:p-2`}
            style={{
                backgroundImage: gradient.class === '' ? gradient.grad : gradient.class,
            }}>
            <div className='border--2 border-red-800 w-full h-fit flex flex-col justify-between items--center p-4 pb-0'>
                <p className={`text-[#fff] font-normal mb-1`}> {props.sub_title} </p>
                <h3 className={`text-[#fff] max-[480px]:text-lg text-2xl font-semibold`}> {props.title} </h3>
            </div>

            <ResponsiveContainer width='100%' height='99%' className={'border--2 border-green-700 pt-0'}>
                <PieChart width={400} height={400}>
                    <Pie data={data} cx='50%' cy='47%' labelLine={false} outerRadius={100} dataKey='value'>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend content={<CustomLegend />} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

// /////////////////////////////
// payment card
// /////////////////////////////
import { RiVisaLine } from 'react-icons/ri'
import { MdOutlineWifi } from 'react-icons/md'
import { BsSim } from 'react-icons/bs'

export const PaymentCard = (props) => {
    const [fieldStyle, setFieldStyle] = useState(true)

    const getData = getCookie('digitalrx') ? JSON?.parse(getCookie('digitalrx')) : getCookie('digitalrx')
    const user_ID = getData?._id
    const userName = getData?.name

    // console.log(getData)

    const gradient = {
        grad: '',
        class: props.class,
    }

    // get card detail api
    const { data } = useCreateDetailsQuery(user_ID)

    const cardNumber = data?.accountDetails?.external_accounts?.data[0]?.last4
    const expMonth = data?.accountDetails?.external_accounts?.data?.[0]?.exp_month
    const expYear = data?.accountDetails?.external_accounts?.data?.[0]?.exp_year

    // send Card detail api
    const [cardDetail, setCardDetail] = useState({
        number: '',
        exp_month: '',
        exp_year: '',
        cvc: '',
    })

    const handelChange = (e) => {
        const { name, value } = e.target

        // Apply specific validation based on the input field
        let updatedValue = value

        console.log(parseInt(updatedValue.split('-').join('')))

        if (name === 'number' || name === 'exp_month' || name === 'exp_year' || name === 'cvc') {
            // Ensure only numbers are entered for card number, expiration month, year, and cvc
            updatedValue = value.replace(/\D/g, '')
        }

        if (name === 'number') {
            // Limit the card number length to 16 digits (typical for most credit cards)
            updatedValue = updatedValue.slice(0, 16) // Limit to 16 characters to accommodate for spaces

            // Add a space after every 4 digits
            updatedValue = updatedValue.replace(/(.{4})(?!$)/g, '$1-').trim()
        }

        if (name === 'exp_month') {
            // Limit the expiration month to 2 digits and ensure it's within the valid range (1-12)
            updatedValue = updatedValue.slice(0, 2)
            if (parseInt(updatedValue) > 12) {
                updatedValue = '12'
            }
        }

        if (name === 'exp_year') {
            // Limit the expiration year to 4 digits
            updatedValue = updatedValue.slice(0, 4)
        }

        if (name === 'cvc') {
            // Limit the CVC to 3 or 4 digits (depending on card type)
            updatedValue = updatedValue.slice(0, 3)
        }

        setCardDetail({ ...cardDetail, [name]: updatedValue })
        // console.log('Updated Card Details:', cardDetail)

        // setCardDetail({ ...cardDetail, [e.target.name]: e.target.value })
    }

    // console.log(cardDetail);

    const { number, exp_month, exp_year, cvc } = cardDetail

    useEffect(() => {
        setCardDetail({
            // number: cardNumber,
            exp_month: expMonth,
            exp_year: expYear,
            cvc: 'cvc',
        })
    }, [data])

    const [addCard, { isLoading }] = useCreateCardMutation()
    const handleClick = async () => {
        try {
            const res = await addCard({
                userID: user_ID,
                data: {
                    number: parseInt(number.split('-').join('')),
                    exp_month: Number(exp_month),
                    exp_year: Number(exp_year),
                    cvc: Number(cvc),
                },
            })
            console.log(res)
            ResponseToast({ res })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div
            className={`${styles.card} ${props.class} border--2 border-yellow-900 w-full h--[13rem] rounded-xl flex max-xl:flex-wrap max-xl:flex-col-reverse justify-center items-center gap-3 py-5 px-6 max-md:p-2 `}
            style={{
                backgroundImage: gradient.class === '' ? gradient.grad : gradient.class,
            }}>
            <div className='border--2 border-[olive] w-full h-full flex flex-col justify-center items-start gap-2 max-xl:mt-3 max-xl:items--center'>
                <h3 className='text-[#fff] text-lg'>Card Details</h3>

                <div className='max-sm:w-full w-full flex max-sm:flex-col max-sm:justify-center max-sm:items-start justify-between items-center'>
                    <label htmlFor='' className='text-white me-2 w-[10rem]'>
                        {' '}
                        User Name:{' '}
                    </label>
                    {!fieldStyle ? (
                        <Field type='number' name={'userName'} value={userName} placeHolder={userName} className={`${fieldStyle === false ? 'w-full min-sm:w-[12rem]' : 'placeholder:text-[#de8127]'}`} disabled={fieldStyle === true ? true : false} styles={{ color: '#de8127' }} />
                    ) : (
                        <span className='w-full'>
                            <p className='text-white text-left'>{userName}</p>
                        </span>
                    )}
                </div>

                <div className='max-sm:w-full w-full flex max-sm:flex-col max-sm:justify-center max-sm:items-start justify-between items-center'>
                    <label htmlFor='' className='text-white me-2 w-[10rem]'>
                        {' '}
                        Card Number:{' '}
                    </label>
                    {!fieldStyle ? (
                        <Field type='text' name={'number'} value={number} placeHolder={'**** **** **** 3125'} className={`${fieldStyle === false ? 'w-full min-sm:w-full' : 'placeholder:text-[#de8127]'}`} disabled={fieldStyle === true ? true : false} styles={{ color: '#de8127' }} onChange={handelChange} />
                    ) : (
                        <span className='w-full'>
                            <p className='text-white text-left'>**** **** **** {cardNumber}</p>
                        </span>
                    )}
                </div>

                <div className='flex w-full'>
                    <div className='max-sm:w-full flex max-sm:flex-col max-sm:justify-center max-sm:items-start justify-between items-center'>
                        <label htmlFor='' className={`text-white me--7 ${!fieldStyle ? 'min-w-[7.5rem]' : 'min-w-[7.5rem]'}`}>
                            {' '}
                            Valid Thru:{' '}
                        </label>
                        {!fieldStyle ? (
                            <div className='w-[14rem] flex items-center gap-2'>
                                <Field type='number' name={'exp_month'} value={exp_month} placeHolder={'Expiry Month'} className={`${fieldStyle === false ? 'w-full min-sm:w-[12rem] max-sm:ms--0 max-lg:w--[15vw] max-lg:ms--12 lg:ms--7' : 'placeholder:text-[#de8127]'}`} disabled={fieldStyle === true ? true : false} styles={{ color: '#de8127' }} onChange={handelChange} />
                                <label htmlFor='' className='text-white mx-1 '>
                                    /
                                </label>
                                <Field type='number' name={'exp_year'} value={exp_year} placeHolder={'Expiry Year'} className={`${fieldStyle === false ? 'w-full min-sm:w-[12rem] max-lg:w--[15vw] max-lg:ms--10' : 'placeholder:text-[#de8127]'}`} disabled={fieldStyle === true ? true : false} styles={{ color: '#de8127' }} onChange={handelChange} />
                            </div>
                        ) : (
                            <span className='flex items-center max-sm:ms-0 max-lg:ms--[5.5rem]'>
                                <p className='text-white text-right'>{expMonth}</p>
                                <label htmlFor='' className='text-white mx-1 '>
                                    /
                                </label>
                                <span>
                                    <p className='text-white text--right'>{expYear}</p>
                                </span>
                            </span>
                        )}
                    </div>
                </div>

                <div className='max-sm:w-full w-full flex max-sm:flex-col max-sm:justify-center max-sm:items-start justify--between items-center'>
                    <label htmlFor='' className='border--2 border-[red] text-white me-2 min-w-[7rem]'>
                        {' '}
                        CVC{' '}
                    </label>
                    {!fieldStyle ? (
                        <div className='border--2 border-[green] w-[4rem]'>
                            <Field type='number' name={'cvc'} value={cvc} placeHolder={'312'} className={`${fieldStyle === false ? 'w-full min-sm:w-full' : 'placeholder:text-[#de8127]'}`} disabled={fieldStyle === true ? true : false} styles={{ color: '#de8127' }} onChange={handelChange} />
                        </div>
                    ) : (
                        <span className='w-full'>
                            <p className='text-white text-left'>{cvc}</p>
                        </span>
                    )}
                </div>

                {fieldStyle === false ? (
                    <div onClick={handleClick} className='mt-3'>
                        <Button name={'Add card'} onClick={() => setFieldStyle(true)} isLoading={isLoading} />
                    </div>
                ) : (
                    <div className='mt-3'>
                        <Button name={'Edit card'} onClick={() => setFieldStyle(false)} isLoading={isLoading} />
                    </div>
                )}

                {/* <p className='text-[#fff]'>Zip Code: 1478</p> */}
                {/* <p className='text-[#fff]'>Expiry: 26/12/2027</p> */}
            </div>
            <div className={`${styles.credit_card_d} border--2 border-[olive] bg-[#e29e5a] w-full h-[14rem] rounded-xl relative`}>
                <RiVisaLine className='text-white text-7xl max-[390px]:text-6xl absolute top-2 left-8 max-[390px]:left-3' />
                <div className='absolute bottom-5 left-8 max-[390px]:left-3'>
                    <h4 className='text-lg max-[390px]:text-base text-white'>{cardNumber}</h4>
                    <div className='mt-1 flex justify-between'>
                        {/* <p className="text-sm max-[390px]:text-xs text-white"> CVC </p> */}
                        <p className='text-sm max-[390px]:text-xs text-white'>
                            {' '}
                            {expMonth}/{expYear}{' '}
                        </p>
                    </div>
                </div>
                <MdOutlineWifi className='text-[#ffffff8f] text-4xl max-[390px]:text-3xl absolute right-7 top-20 rotate-90 max-[390px]:right-3' />
                <BsSim className='text-[#ffffff8f] text-4xl max-[390px]:text-3xl absolute right-7 bottom-5 rotate-90 max-[390px]:right-3' />
            </div>
        </div>
    )
}

// /////////////////////////////
// table card
// /////////////////////////////

import { columns_wallet } from '../dataTable/columns'
import Button from '../button/Button'
import Field from '../inputFIeld/Field'
import { useEffect, useState } from 'react'
import { useCreateCardMutation, useCreateDetailsQuery } from '@/Redux/PaymentSlice/PaymentSlice'
import ResponseToast from '../toast/Toast'
import { getCookie } from 'cookies-next'
import { useSelector } from 'react-redux';

export const TableCard = (props) => {
    // const gradient = {
    //   grad: "",
    //   class: props.class,
    // }; ${styles.card}

    const text_color = useSelector((state) => state.theme.text_color);

    return (
        <div className={`${props.class} p-2 rounded-xl`}>
            <div className='border--2 border-red-800 w-full h--[3rem] flex max-[400px]:flex-col justify-between items-center p-2  pb-0'>
                <h3 className={`${text_color} max-[480px]:text-lg text-2xl font-semibold`}> {props.title} </h3>
            </div>
            <DataTablePri
                className={`${text_color} hover:bg-[#de8127] hover:text-[#fff]`}
                header_row_className={``}
                table_head_className={`${text_color}`}
                table_title={''}
                columns={props?.table_head}
                // columns={columns_wallet}
                data={props?.table_data}
            />
        </div>
    )
}
