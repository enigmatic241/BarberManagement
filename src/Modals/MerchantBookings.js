import React, { useEffect, useState } from 'react'
import { Flexbox } from '../styled-component';
import { Typography, Button } from '@material-ui/core'
import ModalComponent from '../components/ModalComponent/ModalComponent'
import { getUsersBookings } from '../Api/apis';
import { useAuth } from '../Context/AuthContext';
import { ref, update, getDatabase, remove } from 'firebase/database'
import Chip from '@material-ui/core/Chip';

const database = getDatabase()

const MerchantBookings = ({ open, handleClose }) => {
    const [merchantBookings, setMerchantBookings] = useState([])
    const { currentUser } = useAuth()

    const getMerchantBooking = async () => {
        const response = await getUsersBookings()
        if (response) {
            const filteredBookings = response.filter(item => item.owner === currentUser?.email)
            setMerchantBookings(filteredBookings)
        }
    }

    const handleBookings = async (booking, operation) => {
        // const response = await removeShop(shop)
        const bookingRef = ref(database, `UserBookings/${booking.id}`);

        const bookingStatus = {


        }
        if (operation === 'cancel') {
            bookingStatus['status'] = 'cancelled'
        }
        if (operation === 'confirm') {
            bookingStatus['status'] = 'confirm'
        }

        update(bookingRef, bookingStatus)
            .then(() => {
                console.log("Entry deleted successfully")
                getMerchantBooking();
            })
            .catch((error) => {
                console.error("Error deleting entry:", error);
            });
    }

    useEffect(() => {
        if (open)
            getMerchantBooking()
    }, [open])

    return (
        <ModalComponent
            open={open}
            onClose={handleClose}
            title={'Your Bookings'}
            divider={true}
        >
            <Flexbox dir={'column'} pad={'16px'} height={'100%'} gap={'24px'} >
                {merchantBookings.length === 0 ? <Typography>No Bookings</Typography> :
                    merchantBookings.map(item => (
                        <Flexbox style={{ border: '1px solid lightgray' }} justify={'space-between'} key={item.name} gap={'8px'} pad={'8px'}>
                            <Typography>{item.name}</Typography>
                            <Typography>{item.price}</Typography>
                            <Typography>{item.gender}</Typography>
                            <Typography>{item.time}</Typography>

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

                            {!item.status && <Button onClick={() => {
                                handleBookings(item, 'cancel')
                            }} variant={'contained'}>Cancel</Button>}
                            {!item.status && <Button onClick={() => { handleBookings(item, "confirm") }} variant={'contained'}>Confirm</Button>}
                        </Flexbox>
                    ))}

            </Flexbox>
        </ModalComponent>
    )
}

export default MerchantBookings