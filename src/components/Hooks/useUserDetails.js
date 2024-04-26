import React, { useEffect, useState } from 'react'
import { getUserDetails } from '../../Api/apis'
import { useAuth } from '../../Context/AuthContext'


const useUserDetails = () => {
    const [userDetails, setUserDetails] = useState([])
    const [userType, setUserType] = useState('')
    const { currentUser } = useAuth()

    const handleGetUserDetails = async () => {
        // fetch user details
        const response = await getUserDetails()
        setUserDetails(response)
        console.log(response, "response user details")
        if (response && currentUser) {
            const filterUser = userDetails.filter(user => user.email === currentUser.email)
            setUserType(filterUser[0]?.user_type)
        }
    }

    useEffect(() => {
        // fetch user details
        handleGetUserDetails()
    }, [])

    return { userDetails, setUserDetails, userType }
}


export default useUserDetails