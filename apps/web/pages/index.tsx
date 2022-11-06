import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import StudentLogin from '../components/StudentLogin'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <section className=" h-[600px] flex justify-center items-center bg-no-repeat bg-center bg-cover bg-blend-color-burn bg-[url('https://source.unsplash.com/random/?question')]">
        <div className='backdrop-blur-lg p-12 flex flex-col justify-center items-center gap-5'>
          <span className='font-bold text-6xl text-white'>OpenQuizWare</span>
          <p className='text-2xl font-semibold text-white'>Win Quiz, Earn NFTs!</p>
          <StudentLogin />
        </div>
      </section>
      <section className='flex justify-around items-center'>
        <div className='flex flex-col justify-start gap-3'>
          <span className='text-2xl font-bold font-mono'>Level Up!</span>
          <p className='font-mono text-lg'>Each quiz has a level assigned and you cross that level, your Student gets an NFT!</p>
          <Link href='/college' className='p-4 bg-green-300 font-medium  max-w-fit rounded-lg'>College Login</Link>
        </div>
        <Image alt='' src='/quiz.png' width={800} height={800} />
      </section>
    </div>
  )
}
