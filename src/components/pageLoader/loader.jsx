// Loader.js
import { useState, useEffect } from 'react'

const Loader = () => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1500)

        return () => clearTimeout(timer)
    }, [])

    return loading ? (
        // <div className='border-2 border-[green] w-[5rem] h-[5rem] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] bg-black'>  </div>
        <div className='border--2 border-[red] w-full h-full rounded-xl absolute top-0 left-0 flex flex-col justify-center items-center z-[100] bg-[#fffffff3]'>
            <div>
                <img src='/image/main/loader.gif' className='w-[5rem] m-auto box_shadow__sec' alt='img.gif' />
                <p className='text-center mt-5 font-semibold'> Loading... </p>
            </div>
        </div>
    ) : null
}

export default Loader
