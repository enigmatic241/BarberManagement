import React, { useEffect } from 'react'
import useUserDetails from '../../components/Hooks/useUserDetails'
import UserHome from './UserHome/UserHome'
import { useAuth } from '../../Context/AuthContext'
import MerchantHome from './MerchantHome/MerchantHome'
// import MerchantHome from './MerchantHome/MerchantHome'

const Home = () => {
    const { userDetails } = useUserDetails()
    const { currentUser } = useAuth()
    const [userType, setUserType] = React.useState('')

    useEffect(() => {
        if (userDetails) {
            const filterUser = userDetails.filter(user => user.email === currentUser?.email)
            setUserType(filterUser[0]?.user_type)
        }
    }, [userDetails, currentUser])

    console.log(userType, "userType")
    return (
        <>
            {userType === 'CUSTOMER' && <UserHome />}
            {userType === 'MERCHANT' && <MerchantHome />}
        </>
    )
}

export default Home