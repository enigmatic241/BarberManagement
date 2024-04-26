import React from 'react'
import { Flexbox } from '../../styled-component'

import useUserDetails from '../../components/Hooks/useUserDetails'
import UserHome from './UserHome/UserHome'

const Home = () => {
    const { userType } = useUserDetails()
    return (
        <>
            {userType === 'CUSTOMER' && <UserHome />}

        </>
    )
}

export default Home