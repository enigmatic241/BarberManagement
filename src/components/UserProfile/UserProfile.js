import React from 'react'
import { useAuth } from '../../Context/AuthContext'
import { Button } from '@material-ui/core'
import { Flexbox } from '../../styled-component'


const UserProfile = () => {
    const { currentUser } = useAuth()
    console.log(currentUser)
    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', width: '300px', backgroundColor: 'white' }}>

            <p><strong>Email:</strong> {currentUser.email}</p>
            <Flexbox gap={'8px'} justify={'center'}>
                <Button variant={'contained'}>Logout</Button>
                <Button variant={'contained'}>Reset Password</Button>
            </Flexbox>
        </div>
    )
}

export default UserProfile