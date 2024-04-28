import React, { useEffect, useState } from 'react'
import { Flexbox } from '../../styled-component';
import { Typography, Button } from '@material-ui/core'
import ModalComponent from '../../components/ModalComponent/ModalComponent'
import { getUsersBookings } from '../../Api/apis';

import { ref, remove, getDatabase } from 'firebase/database';
import Chip from '@material-ui/core/Chip';
import { useAuth } from '../../Context/AuthContext';

const database = getDatabase()

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
        console.log(id, myBooking)


        const bookingRef = ref(database, `UserBookings/${id}`);

        // Remove the entry
        remove(bookingRef)
            .then(() => {
                console.log("Entry deleted successfully")
                handleGetUserBookings();
            })
            .catch((error) => {
                console.error("Error deleting entry:", error);
            });

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
            <Flexbox dir={'column'} pad={'16px'} gap={'24px'} >
                {myBooking.length === 0 ?
                    <Typography>No Bookings</Typography> :
                    myBooking.map(item => (
                        <Flexbox style={{ border: '1px solid lightgray' }} justify={'space-between'} key={item.name} gap={'8px'} pad={'8px'}>
                            <Typography>{item.name}</Typography>
                            <Typography>{item.shopId}</Typography>
                            <Typography>{item.time}</Typography>
                            <Typography>{item.price}</Typography>
                            {item.status === 'cancelled' && <Chip
                                color={'secondary'}
                                label="Cancelled"
                                variant="outlined"
                            />}
                            {item.status === 'confirm' && <Chip
                                color={'primary'}
                                label="Confirmed"
                                variant="outlined"
                            />}
                            {!item.status && <Chip
                                color={'default'}
                                label="Pending"
                                variant="outlined" />}

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