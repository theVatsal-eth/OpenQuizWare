import React, { useCallback } from 'react'
import StudentSidebar from '../../components/StudentSidebar'
import useStore from '../../store/useStore'


const Student = () => {
    const isStudentConnected = useStore(useCallback(state => state.isWalletConnected, []))

    return (
        <>
            <StudentSidebar />
        </>
    )
}

export default Student