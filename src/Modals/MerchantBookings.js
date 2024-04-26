import React, { useEffect, useState } from 'react'
import { Flexbox } from '../styled-component';
import { Typography, Button } from '@material-ui/core'
import ModalComponent from '../components/ModalComponent/ModalComponent'
import { getUsersBookings } from '../Api/apis';



const BarbProducts = [
    {
        name: 'Trim',
        price: '₹300',
        description: 'A simple and neat haircut to maintain your current style.',
    },
    {
        name: 'Layered Cut',
        price: '₹500',
        description: 'A haircut with layers to add volume and texture to your hair.',
    },
    {
        name: 'Bob Cut',
        price: '₹400',
        description: 'A classic short haircut where the hair is typically cut straight around the head at jaw-length.',
    },
    {
        name: 'Pixie Cut',
        price: '₹450',
        description: 'A short hairstyle with short, close-cropped hair on the sides and back of the head and slightly longer hair on top.',
    },
    // Add more barber products with name, price, and description as needed
];



const MerchantBookings = ({ open, handleClose }) => {
    const [merchantBookings, setMerchantBookings] = useState([])

    const getMerchantBooking = async () => {
        const response = await getUsersBookings()
        setMerchantBookings(response)
    }

    useEffect(() => {
        getMerchantBooking()
    }, [])

    return (
        <ModalComponent
            open={open}
            onClose={handleClose}
            title={'Your Bookings'}
            // classes={classes}
            divider={true}
        >
            <Flexbox dir={'column'} pad={'16px'} height={'100%'} gap={'24px'} >
                {merchantBookings.map(item => (
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