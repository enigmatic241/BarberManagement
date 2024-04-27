import React, { useEffect, useState } from 'react'
import { Flexbox } from '../../styled-component';
import { Typography, Button } from '@material-ui/core'
import ModalComponent from '../../components/ModalComponent/ModalComponent'
import { getUsersBookings } from '../../Api/apis';
import { db } from '../../Authentication/firebase';
import { ref, remove } from 'firebase/database';
import CheckIcon from '@material-ui/icons/Check';

import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import { useAuth } from '../../Context/AuthContext';


const UsersBooking = ({ open, handleClose }) => {
    const [myBooking, setMyBookings] = useState([])
    const { currentUser } = useAuth()

    const handleGetUserBookings = async () => {
        const response = await getUsersBookings()

        if (response) {
            const bookingData = response.filter(item => item.email === currentUser?.email)
            setMyBookings(bookingData)
        }

    }

    const handleCancelBooking = async (id) => {
        try {
            await remove(db, `/UsersBookings/` + id)
            handleGetUserBookings()
        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        if (open)
            handleGetUserBookings()
    }, [open])
    return (
        <ModalComponent
            open={open}
            onClose={handleClose}
            title={'My Bookings'}
            // classes={classes}
            divider={true}
        >
            <Flexbox dir={'column'} pad={'16px'} height={'100%'} gap={'24px'} >
                {myBooking.length === 0 ?
                    <Typography>No Bookings</Typography> :
                    myBooking.map(item => (
                        <Flexbox style={{ border: '1px solid lightgray' }} justify={'space-between'} key={item.name} gap={'8px'} pad={'8px'}>
                            <Typography>{item.name}</Typography>
                            <Typography>{item.shopId}</Typography>
                            <Typography>{item.time}</Typography>
                            <Typography>{item.price}</Typography>
                            {item.confirm ? <CheckIcon /> : <QueryBuilderIcon />}

                            <Button onClick={() => {
                                handleCancelBooking(item.id)
                            }} variant={'contained'}>Cancel</Button>
                        </Flexbox>
                    ))}

            </Flexbox>
        </ModalComponent>
    )
}

export default UsersBooking