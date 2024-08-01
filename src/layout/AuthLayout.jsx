import Image from 'next/image'
import React from 'react'

const AuthLayout = ({ children, isIcon = true }) => { 
    return (
        <div className='bg-main-bg h-screen bg-no-repeat bg-cover'>
            <Image src={"/image/main/Logobg.png"} width={250} height={250} alt='Logo Bg' className='absolute top-0 left-0 xl:h-80 xl:w-56 lg:h-60 lg:w-48 md:h-60 md:w-64 sm:w-32 sm:h-48 w-24 h-28' />
            {isIcon &&
                <div className='relative'>
                    <Image src={"/image/main/Logobg.png"} width={250} height={250} alt='Logo Bg' className='absolute top-0 left-0 xl:h-80 xl:w-56 lg:h-60 lg:w-48 md:h-60 md:w-64 sm:w-32 sm:h-48 w-24 h-28 z-0' />
                    <Image src={"/image/main/logoWhite.png"} width={75} height={75} className='z-10 absolute sm:top-4 top-1 xl:left-16 md:left-10 sm:left-8 left-5 xl:w-20 md:w-16 h-auto sm:w-12 w-8 ' alt='Auth Layout Img' />
                </div>
            }
            {children}
        </div>
    )
}

export default AuthLayout
