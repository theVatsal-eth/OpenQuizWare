import Link from 'next/link'
import React, { Children } from 'react'
import StudentLogin from './StudentLogin'

interface Props {
    children: JSX.Element
}

const Layout:React.FC<Props> = ({children}) => {
  return (
    <>
        <div className='bg-slate-100 p-8 left-0 top-0 flex justify-around border-b-[1px] border-slate-200'>
            <h1 className='text-3xl font-bold'>Open Quiz Ware</h1>
            <nav className='flex justify-around items-center gap-5'>
                <span><Link href='/college' className='text-xl font-semibold'>College</Link></span>
                <StudentLogin />
            </nav>
        </div>
        {children}
    </>
    )
}

export default Layout