import React from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import Dashboard from './student/dashboard'

const StudentSidebar = () => {
  return (
    <>
        <Tabs.Root orientation='vertical' className=' flex w-screen h-[calc(100vh-101px)]'>
            <Tabs.List className='left-0 top-0 flex flex-col justify-center items-start gap-3 bg-slate-100 w-fit h-full p-8'>
                <Tabs.Trigger value='dash' className='p-3 text-center text-xl font-semibold bg-slate-300 rounded-lg w-full'>Dashboard</Tabs.Trigger>
                <Tabs.Trigger value='nft' className='p-3 text-center text-xl font-semibold bg-slate-300 rounded-lg w-full'>NFT</Tabs.Trigger>
                <Tabs.Trigger value='college' className='p-3 text-center text-xl font-semibold bg-slate-300 rounded-lg w-full'>Colleges</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content className='w-screen' value='dash'><Dashboard/></Tabs.Content>
            <Tabs.Content value='nft'></Tabs.Content>
            <Tabs.Content value='college'></Tabs.Content>
        </Tabs.Root>
    </>
  )
}

export default StudentSidebar