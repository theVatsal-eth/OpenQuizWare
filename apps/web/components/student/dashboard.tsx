import React from 'react'

const Dashboard = () => {
    return (
        <div className='p-8 flex flex-col gap-10 justify-start items-start text-black h-[calc(100vh-101px)] w-[calc(100vw-191px)]'>
            <span className='text-3xl font-bold'>Dashboard &gt;</span>
            <div className='flex gap-5'>
                <div className='px-10 py-5 text-left gap-2 rounded-lg bg-green-400 flex flex-col'>
                    <span className='text-2xl font-bold'>
                        No. of Colleges
                    </span>
                    <span className='text-xl font-medium'>
                        32
                    </span>
                </div>
                <div className='px-10 py-5 text-left gap-2 rounded-lg bg-indigo-400 flex flex-col'>
                    <span className='text-2xl font-bold'>
                        No. of Colleges
                    </span>
                    <span className='text-xl font-medium'>
                        32
                    </span>
                </div>
            </div>
            <div className='w-full'>
                <span className='text-3xl font-bold'>Quizzes &gt;</span>
                <table className="table w-full">
                    <thead className='w-full'>
                        <tr className='odd:bg-slate-200 even:bg-slate-400'>
                            <th>Quiz</th>
                            <th>College</th>
                            <th>Status</th>
                            <th>Filename</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard