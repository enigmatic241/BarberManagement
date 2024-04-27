import React, { useEffect, useState } from 'react'
import { Flexbox } from '../styled-component';
import { Typography, Button } from '@material-ui/core'
import ModalComponent from '../components/ModalComponent/ModalComponent'
import { getUsersBookings } from '../Api/apis';
import { useAuth } from '../Context/AuthContext';

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
                            <Button onClick={() => {
                                const updatedBookings = merchantBookings.filter(booking => booking.name !== item.name)
                                // setBarberProducts(updatedBookings)
                            }} variant={'contained'}>Cancel</Button>
                            <Button onClick={() => { }} variant={'contained'}>Confirm</Button>
                        </Flexbox>
                    ))}

            </Flexbox>
        </ModalComponent>
    )
}

export default MerchantBookings